import { useEffect, useState, useCallback } from "react";
import PendingTable from "./PendingTable";
import FlaggedTable from "./FlaggedTable";
import ApprovedTable from "./ApprovedTable";

// Make sure your frontend/.env has:
// VITE_API_URL=https://localhost:4040/totallysecure/
const API = import.meta.env.VITE_API_URL;

export default function AdminTransactions() {
  // views: 'pending' | 'flagged' | 'approved'
  const [view, setView] = useState("pending");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRows = useCallback(async () => {
    setLoading(true);
    try {
      let url, body;

      if (view === "approved") {
        url = `${API}admin/fetchHistory`;
        body = { status: "approved" };
      } else if (view === "flagged") {
        url = `${API}admin/fetchTransactions`;
        body = { status: "flagged" };
      } else {
        url = `${API}admin/fetchTransactions`;
        body = { status: "pending" };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed so /protect + verifyRole see the cookie
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setRows(Array.isArray(data.transactions) ? data.transactions : []);
      } else {
        console.error("Fetch error:", data);
        setRows([]);
      }
    } catch (e) {
      console.error("Network error:", e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [view]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API}admin/updateStatus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update");
        return;
      }
      // refresh current list
      fetchRows();
    } catch (e) {
      console.error("Update error:", e);
      alert("Server error");
    }
  };

  const onApprove = (id) => updateStatus(id, "approved");
  const onReject  = (id) => updateStatus(id, "rejected");
  const onDelete  = (id) => updateStatus(id, "rejected"); // treating delete as reject

  return (
    <>
      {loading && <p style={{ padding: 12 }}>Loading…</p>}

      {!loading && view === "pending" && (
        <PendingTable
          transactions={rows}
          onApprove={onApprove}
          onReject={onReject}
          setView={setView}
        />
      )}

      {!loading && view === "flagged" && (
        <FlaggedTable
          transactions={rows}
          onDelete={onDelete}
          onApprove={onApprove}
          setView={setView}
        />
      )}

      {!loading && view === "approved" && (
        <ApprovedTable
          transactions={rows}
          onDelete={onDelete}
          onApprove={onApprove}
          setView={setView}
        />
      )}
    </>
  );
}
