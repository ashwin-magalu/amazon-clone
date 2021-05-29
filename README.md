1. npm i stripe
2. https://stripe.com/docs/payments/accept-a-payment

# Installing Stripe CLI to create a webhook

Visit https://stripe.com/docs/stripe-cli, and follow the instructions
or
1. Install scoop using powershell:
2. Run command: Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
3. Run command: scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli
4. Run command: scoop install stripe
5. Run command: stripe login
    Please note: this key will expire after 90 days, at which point you'll need to re-authenticate.
6. Your pairing code is: some-string
7. Run Command: stripe listen --forward-to localhost:3000/api/webhook
8. Copy the secret and paste it in .env for STRIPE_SIGNING_SECRET. In production build, get this Secret key in stripe dashboard > developers > webhooks > create endpoint > add web hook url and generate secret key.
9. Create webhook.js file in api folder
10. Head to firebase project settings > service accounts > generate new private key > download and move it to root folder and rename it as permissions.json
