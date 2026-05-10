#!/bin/bash
# Outbound test using IMAP host (mail.airomeda.com) for proper SNI cert match.
python3 <<'PY'
import smtplib, ssl
msg_from = "info@airomeda.com"
msg_to = "airomeda.info@gmail.com"
msg = f"""From: Airomeda Info <{msg_from}>
To: {msg_to}
Subject: Outbound test - Mailcow + Resend relay
Content-Type: text/plain; charset=utf-8

Bu mail Mailcow'un info@airomeda.com mailbox'indan, port 587 submission uzerinden
gonderildi. Mailcow Postfix bu maili Resend smart-host relay'ine yonlendirmeli,
Resend internet uzerinden iletmeli.

Origin: Mailcow on airomeda.com VPS
Path: client -> mailcow:587 -> postfix-mailcow -> smtp.resend.com:465 -> internet
"""
ctx = ssl.create_default_context()
with smtplib.SMTP("mail.airomeda.com", 587) as s:
    s.starttls(context=ctx)
    s.login("info@airomeda.com", "masQLLAZ0SJVg5fmjn")
    s.sendmail(msg_from, [msg_to], msg.encode("utf-8"))
print("OK - sent via Mailcow submission")
PY

sleep 6
echo "=== Postfix mail log (last) ==="
docker exec mailcowdockerized-postfix-mailcow-1 tail -100 /var/log/mail.log 2>/dev/null | grep -iE "(info@airomeda|smtp\.resend|relay=|status=sent|airomeda\.info@gmail)" | tail -10
