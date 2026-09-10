with open('admin.js', 'r') as f:
    content = f.read()

# 1. Remove ADMIN_CONFIG
import re
admin_config_pattern = r'const ADMIN_CONFIG = \{[\s\S]*?\};\n+'
content = re.sub(admin_config_pattern, '', content)

# 2. Extract initAuth
start_idx = content.find('  initAuth() {')
end_idx = content.find('  bindGlobalEvents() {') - 100
end_idx = content.rfind('  },', start_idx, end_idx) + 4

new_init_auth = """  initAuth() {
    const loginView = document.getElementById('login-view');
    const dashboardView = document.getElementById('dashboard-view');
    const loginForm = document.getElementById('login-form');
    const loginErr = document.getElementById('login-error');
    const togglePwd = document.getElementById('toggle-password-btn');
    const pwdInput = document.getElementById('login-password');
    const logoutBtn = document.getElementById('logout-btn');

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (loginView) loginView.classList.add('hidden');
        if (dashboardView) dashboardView.classList.remove('hidden');
        this.renderAll();
      } else {
        if (loginView) loginView.classList.remove('hidden');
        if (dashboardView) dashboardView.classList.add('hidden');
      }
    });

    if (togglePwd && pwdInput) {
      togglePwd.addEventListener('click', () => {
        const isPwd = pwdInput.type === 'password';
        pwdInput.type = isPwd ? 'text' : 'password';
        togglePwd.textContent = isPwd ? 'Hide' : 'Show';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('login-email').value.trim();
        const p = pwdInput.value.trim();

        try {
          await signInWithEmailAndPassword(auth, u, p);
          loginErr.classList.add('hidden');
          loginForm.reset();
          ToastManager.show('Login successful! Welcome to Admin CMS.', 'success');
        } catch (error) {
          loginErr.textContent = error.message || 'Email atau password salah.';
          loginErr.classList.remove('hidden');
          ToastManager.show('Login failed: Invalid credentials.', 'error');
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        this.confirm(
          'Confirm Logout',
          'Apakah Anda yakin ingin keluar dari Admin Dashboard?',
          async () => {
            try {
              await signOut(auth);
              ToastManager.show('Logged out successfully.', 'info');
            } catch (error) {
              ToastManager.show('Logout failed.', 'error');
            }
          },
          '🚪'
        );
      });
    }
  },
"""

content = content[:start_idx] + new_init_auth + content[end_idx:]

with open('admin.js', 'w') as f:
    f.write(content)
