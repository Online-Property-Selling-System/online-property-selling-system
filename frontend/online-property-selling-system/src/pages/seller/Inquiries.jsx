import { useState } from "react";
import { toast } from "react-toastify";

function Inquiries() {
  /* ---------- DUMMY DATA (BACKEND READY) ---------- */
  const [inquiries, setInquiries] = useState([
    {
      id: 101,
      buyerName: "Rahul Sharma",
      buyerEmail: "rahul@gmail.com",
      propertyTitle: "2 BHK Apartment, Pune",
      message: "Is the price negotiable?",
      reply: "",
    },
    {
      id: 102,
      buyerName: "Anita Deshmukh",
      buyerEmail: "anita@gmail.com",
      propertyTitle: "Commercial Shop, Karad",
      message: "Can I schedule a visit?",
      reply: "",
    },
  ]);

  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyText, setReplyText] = useState("");

  /* ---------- SEND REPLY ---------- */
  const sendReply = (id) => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    setInquiries(prev =>
      prev.map(inq =>
        inq.id === id ? { ...inq, reply: replyText } : inq
      )
    );

    toast.success("Reply sent successfully");
    setReplyText("");
    setActiveReplyId(null);
  };

  /* ---------- DELETE WITH TOAST CONFIRM ---------- */
  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="fw-semibold mb-2">Delete this inquiry?</p>
          <div className="d-flex gap-2">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                setInquiries(prev => prev.filter(inq => inq.id !== id));
                toast.success("Inquiry deleted");
                closeToast();
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  return (
    <div className="container mt-5" style={{ paddingTop: "72px" }}>
      <h3 className="fw-bold">Buyer Inquiries</h3>
      <hr />

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Inquiry ID</th>
              <th>Buyer</th>
              <th>Property</th>
              <th>Message</th>
              <th>Reply</th>
              <th style={{ width: "230px" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted py-4">
                  No inquiries available
                </td>
              </tr>
            ) : (
              inquiries.map(inq => (
                <tr key={inq.id}>
                  <td>{inq.id}</td>

                  <td>
                    <strong>{inq.buyerName}</strong>
                    <br />
                    <small className="text-muted">{inq.buyerEmail}</small>
                  </td>

                  <td>{inq.propertyTitle}</td>
                  <td>{inq.message}</td>

                  <td>
                    {inq.reply ? (
                      <span className="text-success">{inq.reply}</span>
                    ) : (
                      <span className="text-muted">No reply yet</span>
                    )}
                  </td>

                  <td>
                    <div className="d-flex gap-2 align-items-start">
                      {activeReplyId === inq.id ? (
                        <div className="w-100">
                          <textarea
                            className="form-control mb-2"
                            rows="2"
                            placeholder="Type your reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />

                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => sendReply(inq.id)}
                            >
                              Send
                            </button>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => {
                                setActiveReplyId(null);
                                setReplyText("");
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => setActiveReplyId(inq.id)}
                        >
                          Reply
                        </button>
                      )}

                      {/* DELETE */}
                      <button
                        className="btn btn-outline-danger btn-sm"
                        title="Delete Inquiry"
                        onClick={() => confirmDelete(inq.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Inquiries;
