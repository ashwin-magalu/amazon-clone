1. npm i stripe
2. https://stripe.com/docs/payments/accept-a-payment

Installing Stripe CLI to create a webhook

Visit https://stripe.com/docs/stripe-cli, and follow the instructions
or
Install scoop using powershell:
Run command: Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
Run command: scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli
Run command: scoop install stripe
Run command: stripe login
Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.
Your pairing code is: superb-enough-heroic-glory
Run Command: stripe listen --forward-to localhost:3000/api/webhook
Copy the secret and paste it in .env for STRIPE_SIGNING_SECRET
Create webhook.js file in api folder
Head to firebase project settings > service accounts > generate new private key > download and move it to root folder and rename it as permissions.json
