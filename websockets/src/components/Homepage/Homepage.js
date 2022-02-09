import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import idea from "../../idea.png";
import chat from "../../chat.png";
import happy from "../../happy.png";
import excite from "../../excite.png";
import { useSelector } from "react-redux";
function Homepage() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.session.user);

  return (
    <div className="homepage-container">
      <div className="header-section-wrapper">
        <div className="frontpage-section">
          <img
            style={{
              width: "400px",
              marginTop: "320px",
            }}
            alt="art"
            src={idea}
          ></img>
          <div className="header-content">
            <div className="header-text">Imagine a place...</div>
            <div className="header-paragraph">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </div>
            {user ? (
              <div
                className="login-button"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </div>
            ) : (
              <div className="login-button" onClick={() => navigate("/login")}>
                Login
              </div>
            )}
          </div>
          <img
            src={chat}
            alt="chat"
            style={{
              width: "400px",
              marginBottom: "300px",
            }}
          ></img>
        </div>
      </div>
      <div className="frontpage-section">
        <img src={happy} alt="discord" style={{ width: "600px" }} />
        <div
          style={{
            display: "flex",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="section-half">
            <div className="section-text">
              Create an invite-only place where you belong
            </div>
            <div style={{ fontSize: "20px" }}>
              Discord servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </div>
          </div>
        </div>
      </div>
      <div className="last-section-container">
        <div className="frontpage-section">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "55%",
                marginRight: "150px",
              }}
            >
              <div className="section-text">Where hanging out is easy</div>
              <div style={{ fontSize: "20px" }}>
                Grab a seat in a voice channel when you’re free. Friends in your
                server can see you’re around and instantly pop in to talk
                without having to call.
              </div>
            </div>
          </div>
          <img src={excite} alt="discord" style={{ width: "600px" }} />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
