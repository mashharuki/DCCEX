# XRPL Web3Auth project

NextJS and NextUI Dashboard Template Starter をベースにしています。

## For Run

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

Now you can visit https://localhost:3000 in your browser.

## 没実装 (画面からトークンを発行)

```ts
// Enable issuer DefaultRipple ----------------------------------------------
const { created, resolve, resolved, websocket } =
  await xumm!.payload!.createAndSubscribe(
    {
      TransactionType: "AccountSet",
      Account: address!,
      SetFlag: AccountSetAsfFlags.asfRequireDest,
    },
    (eventMessage) => {
      if (Object.keys(eventMessage.data).indexOf("opened") > -1) {
        console.log("eventMessage:", eventMessage);
      }
      if (Object.keys(eventMessage.data).indexOf("signed") > -1) {
        console.log("eventMessage:", eventMessage);
        return eventMessage;
      }
    }
  );

console.log("Payload URL:", created.next.always);
console.log("Payload QR:", created.refs.qr_png);

websocket.onmessage = (msg) => {
  const data = JSON.parse(msg.data.toString());
  // トランザクションへの署名が完了/拒否されたらresolve
  if (typeof data.signed === "boolean") {
    resolve({
      signed: data.signed,
      txid: data.txid,
    });
  }
};

const payload: any = await resolved;
console.log("Resolved", payload);
console.log(`URL: ${EXPLORER}/transactions/${payload!.txid}`);

// Create trust line to issuer ----------------------------------------------
// get env
const { FAUCET_SEED } = await getEnv();
// Create a wallet using the seed
const wallet = await Wallet.fromSeed(FAUCET_SEED);

const { created: created2, resolved: resolved2 } =
  await xumm!.payload!.createAndSubscribe(
    {
      TransactionType: "TrustSet",
      Account: wallet.address,
      Fee: "20000",
      SetFlag: AccountSetAsfFlags.asfDefaultRipple,
      // Using tf flags, we can enable more flags in one transaction
      Flags:
        AccountSetTfFlags.tfDisallowXRP | AccountSetTfFlags.tfRequireDestTag,
      LimitAmount: {
        currency: currency_code,
        issuer: wallet.address,
        value: "100000000000000000", // Large limit, arbitrarily chosen
      },
    },
    (eventMessage) => {
      if (Object.keys(eventMessage.data).indexOf("opened") > -1) {
        console.log("TrustSet eventMessage:", eventMessage);
      }
      if (Object.keys(eventMessage.data).indexOf("signed") > -1) {
        console.log("TrustSet eventMessage:", eventMessage);
        return eventMessage;
      }
    }
  );

console.log("Payload URL:", created2.next.always);
console.log("Payload QR:", created2.refs.qr_png);

const payload2 = await resolved2;
console.log("Resolved", payload2);

// Issue tokens -------------------------------------------------------------
const { created: created3, resolved: resolved3 } =
  await xumm!.payload!.createAndSubscribe(
    {
      TransactionType: "Payment",
      Account: wallet.address,
      Amount: {
        currency: currency_code,
        value: issue_quantity,
        issuer: wallet.address,
      },
      Destination: wallet.address,
    },
    (eventMessage) => {
      if (Object.keys(eventMessage.data).indexOf("opened") > -1) {
        console.log("Payment eventMessage:", eventMessage);
      }
      if (Object.keys(eventMessage.data).indexOf("signed") > -1) {
        console.log("Payment eventMessage:", eventMessage);
        return eventMessage;
      }
    }
  );

console.log("Payload URL:", created3.next.always);
console.log("Payload QR:", created3.refs.qr_png);

const payload3 = await resolved3;
console.log("Resolved", payload3);

const tokenInfo: TokenInfo = {
  currency: currency_code,
  value: issue_quantity,
  issuer: address!,
};
```

## 画面上から作ったトークンの情報

[発行したときのトランザクション](https://devnet.xrpl.org/transactions/028F41294A3A3C727F8FA5E8988C5CAD943ABECD0BE07EC29A007A82E7543F47)

## 画面上から作った AMM

```bash
account
:
"rKoCioH5XSHYJdCQXyBmMYw75QcQDgF6B8"
amount
:
currency
:
"WWW"
issuer
:
"rBgsqbfqwgX7M4PR1wM5jqiMpqLunpRkzT"
value
:
"35900454"
[[Prototype]]
:
Object
amount2
:
"10000000"
asset_frozen
:
false
auction_slot
:
{account: 'rzKW653XWjjZSe1kGWshBMehALvemQbsM', discounted_fee: 50, expiration: '2023-11-19T12:30:31+0000', price: {…}, time_interval: 0}
lp_token
:
currency
:
"03A6ACC627D087C4690A51EEEA6905560D6F72A3"
issuer
:
"rKoCioH5XSHYJdCQXyBmMYw75QcQDgF6B8"
value
:
"18947415.12713542"
[[Prototype]]
:
Object
trading_fee
:
500
vote_slots
:
[{…}]
[[Prototype]]
:
Object
```
