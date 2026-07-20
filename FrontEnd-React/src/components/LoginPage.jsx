import { useState } from "react";

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-label="Sign in to Safely">
        <div className="login-form-panel">
          <a href="#login" className="login-brand" aria-label="Safely home">
            <span className="login-brand-mark"><LockIcon size={14} /></span>
            <span>C-Portal</span>
          </a>

          <div className="login-heading">
            <h1>Welcome back</h1>
            <p>Sign in to continue protecting your privacy.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span>Email address</span>
              <span className="input-wrap">
                <MailIcon size={17} />
                <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
              </span>
            </label>

            <label className="login-field">
              <span>Password</span>
              <span className="input-wrap">
                <LockIcon size={17} />
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" autoComplete="current-password" required />
                <button type="button" className="password-toggle" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                </button>
              </span>
            </label>

            <div className="login-options">
              <label className="remember-option"><input type="checkbox" defaultChecked /> <span>Remember me</span></label>
              <a href="#forgot-password">Forgot password?</a>
            </div>

            <button className="login-submit" type="submit">Sign in <ArrowIcon size={17} /></button>
          </form>

          <p className="create-account">New to Safely? <a href="#create-account">Create an account</a></p>
        </div>

        <aside className="login-art-panel" aria-label="Privacy dashboard preview">
          <div className="art-glow art-glow-large" />
          <div className="art-glow art-glow-small" />
          <div className="art-grid" />
          <div className="art-content">
            <div className="art-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="privacy-core"><ShieldIcon size={44} /></div>
              <div className="data-node node-check"><CheckIcon size={19} /></div>
              <div className="data-node node-lock"><LockIcon size={20} /></div>
              <div className="data-node node-user"><UserIcon size={21} /></div>
              <div className="dashboard-preview">
                <div className="preview-topbar"><i /><i /><i /></div>
                <div className="preview-body">
                  <div className="preview-sidebar"><span /><span /><span /><span /></div>
                  <div className="preview-main">
                    <span className="preview-title" />
                    <div className="preview-stat-row"><span /><span /></div>
                    <span className="preview-chart"><i /><i /><i /><i /><i /><i /></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="art-copy">
              <p className="art-kicker">YOUR PRIVACY, SIMPLIFIED</p>
              <h2>Stay in control of your digital footprint.</h2>
              <p>One secure place to monitor removal requests and keep your personal data private.</p>
            </div>
            <div className="art-pagination" aria-hidden="true"><i className="active" /><i /><i /></div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function SvgIcon({ children, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

const LockIcon = ({ size }) => <SvgIcon size={size}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></SvgIcon>;
const MailIcon = ({ size }) => <SvgIcon size={size}><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4 7 8 6 8-6" /></SvgIcon>;
const EyeIcon = ({ size }) => <SvgIcon size={size}><path d="M2.8 12s3.4-5.5 9.2-5.5S21.2 12 21.2 12 17.8 17.5 12 17.5 2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.3" /></SvgIcon>;
const EyeOffIcon = ({ size }) => <SvgIcon size={size}><path d="m3 3 18 18M10.6 6.8A10.6 10.6 0 0 1 12 6.5c5.8 0 9.2 5.5 9.2 5.5a16.3 16.3 0 0 1-3.1 3.7M6.1 6.1A16.2 16.2 0 0 0 2.8 12s3.4 5.5 9.2 5.5c1.1 0 2.1-.2 3-.5" /><circle cx="12" cy="12" r="2.3" /></SvgIcon>;
const ArrowIcon = ({ size }) => <SvgIcon size={size}><path d="M5 12h14M13 6l6 6-6 6" /></SvgIcon>;
const ShieldIcon = ({ size }) => <SvgIcon size={size}><path d="m12 2.8 7 3v5.1c0 4.6-3.1 7.9-7 10.3-3.9-2.4-7-5.7-7-10.3V5.8l7-3Z" /><path d="m8.8 12 2.1 2.1 4.5-4.5" /></SvgIcon>;
const CheckIcon = ({ size }) => <SvgIcon size={size}><path d="m5 12 4.1 4L19 6.5" /></SvgIcon>;
const UserIcon = ({ size }) => <SvgIcon size={size}><circle cx="12" cy="8" r="3" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></SvgIcon>;

export default LoginPage;
