// HTML email templates for transactional sends.
// Ported verbatim from the pre-rebuild server.js — DO NOT modify
// without verifying the resulting email renders identically in the
// founder's inbox. The accent color #C8A35C and bg #F7F6F2 here are
// the canonical "brass on paper" pairing that the v2 design tokens
// also reference (--accent, --bg).

function row(label, value) {
  if (!value) return '';
  return `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:160px;vertical-align:top">${label}</td><td style="padding:6px 0;font-size:13px;color:#0E1218">${value}</td></tr>`;
}

function emailShell(tag, name, tableRows, blockLabel, blockContent) {
  return `
    <div style="font-family:monospace;max-width:560px;margin:0 auto;background:#F7F6F2;color:#0E1218;padding:32px;border-radius:8px;border:1px solid #E2DFD5;">
      <div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;">
        ARX Systems — ${tag}
      </div>
      <h2 style="font-family:Georgia,serif;font-size:22px;color:#0E1218;margin:0 0 24px;">${name}</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:${blockContent ? '24px' : '0'};">
        ${tableRows}
      </table>
      ${blockContent ? `
      <div style="background:#fff;border-left:3px solid #C8A35C;padding:16px;border-radius:4px;margin-bottom:8px;">
        <div style="font-size:10px;color:#6b7280;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">${blockLabel}</div>
        <div style="font-size:14px;color:#0E1218;line-height:1.6;white-space:pre-wrap">${blockContent}</div>
      </div>` : ''}
      <div style="font-size:10px;color:#9aa3ad;margin-top:24px;">
        Submitted ${new Date().toISOString()} · Reply-To: ${name}
      </div>
    </div>
  `;
}

module.exports = { row, emailShell };
