#!/bin/bash
set -e
python3 <<'PY'
import smtplib, ssl, os
from email.message import EmailMessage
with open("/var/www/airomeda/shared/.env.production") as f:
    for line in f:
        if "=" in line and not line.startswith("#"):
            k, v = line.strip().split("=", 1)
            os.environ[k] = v
msg = EmailMessage()
msg["From"] = "Test Inbound <hello@airomeda.com>"
msg["To"] = "info@airomeda.com"
msg["Subject"] = "Inbound test - Mailcow"
msg.set_content("Resend uzerinden info@airomeda.com adresine gonderildi.\nMailcow Postfix port 25 uzerinden almali, Dovecot inbox'a dusmeli.\n")
ctx = ssl.create_default_context()
with smtplib.SMTP_SSL(os.environ["SMTP_HOST"], int(os.environ["SMTP_PORT"]), context=ctx) as s:
    s.login(os.environ["SMTP_USER"], os.environ["SMTP_PASS"])
    s.send_message(msg)
print("OK - sent")
PY
sleep 5
echo "=== Postfix inbound log (last 5 relevant) ==="
docker exec mailcowdockerized-postfix-mailcow-1 tail -50 /var/log/mail.log 2>/dev/null | grep -iE "info@airomeda|inbound|relay|delivery" | tail -8
echo "=== info@ INBOX message count ==="
docker exec mailcowdockerized-dovecot-mailcow-1 doveadm mailbox status -u info@airomeda.com messages INBOX 2>&1 | tail -3
