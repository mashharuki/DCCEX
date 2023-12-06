# DCCEX

XRPL で動くカーボンクレジット用 DEX DCCEX 用のリポジトリです。

## アプリの実行方法

- モジュールのインストール

  ```bash
  pnpm install
  ```

- フロントのビルド

  ```bash
  pnpm frontend run build
  ```

- フロントの起動

  ```bash
  pnpm frontend run dev
  ```

- サンプル用のスクリプト実行コマンド

  ```bash
  pnpm scripts run create-amm
  ```

  実行結果例

  ```bash
  Requesting address from the faucet...
  Funding an issuer address with the faucet...
  Got issuer address rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/06C0703F31A726ED96A12D7F37602151CD8084C52AC8AAC32C42C2932A13D235
  Trust line created: https://devnet.xrpl.org/transactions/83C1A53EE1AEBE8640640D5C26BBE94A8E48BF000A77FAA7D20A2CF20EEA131A
  Tokens issued: https://devnet.xrpl.org/transactions/81FA97E5BB9DBB69F08E7F8018AF9737D0854E486114869250DC29EEAE74258E
  Funding an issuer address with the faucet...
  Got issuer address rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/39920495A5F4B1357D36E58EF727250ED020F1D9788DCB8D811A45CDFE270692
  Trust line created: https://devnet.xrpl.org/transactions/882D1500AA194AA46D8D09399BE9E15696BF3393DAD2B0D7F35BA6D84ACD595A
  Tokens issued: https://devnet.xrpl.org/transactions/43BE73E72EF31E06FA00538CFAFD5DD7E7EF286659A0ED215D3DDF86164D58BA
  MSH offer placed: https://devnet.xrpl.org/transactions/4C986CC4CAC05F258BD6F83C153BB145232458C10D4664341658A44171175062
  MSH offer placed: https://devnet.xrpl.org/transactions/0246023D715CC4B3AB5594909ADCB83ECC5CAEB068E1F3BA95F58EF4CCC3331F
  No AMM exists yet for the pair
            FOO.rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8 /
            MSH.rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n
            (This is probably as expected.)
  Current AMMCreate transaction cost: 2 XRP
  AMM created: https://devnet.xrpl.org/transactions/2440E92B1DA220B497DF0927310A761BF4FC769BC92341E1169E94513AF1A671
  amm_info_result2: {
    id: 99,
    result: {
      amm: {
        account: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
        amount: {
          currency: 'MSH',
          issuer: 'rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n',
          value: '15'
        },
        amount2: {
          currency: 'FOO',
          issuer: 'rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8',
          value: '100'
        },
        asset2_frozen: false,
        asset_frozen: false,
        auction_slot: {
          account: 'rzKW653XWjjZSe1kGWshBMehALvemQbsM',
          discounted_fee: 50,
          expiration: '2023-12-05T03:02:02+0000',
          price: {
            currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
            issuer: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
            value: '0'
          },
          time_interval: 0
        },
        lp_token: {
          currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
          issuer: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
          value: '38.72983346207417'
        },
        trading_fee: 500,
        vote_slots: [
          {
            account: 'rzKW653XWjjZSe1kGWshBMehALvemQbsM',
            trading_fee: 500,
            vote_weight: 100000
          }
        ]
      },
      ledger_hash: '188D13D54F592251B421F87E195C7B451431E762266DC48AC88A69F851D68AD0',
      ledger_index: 2182662,
      validated: true
    },
    type: 'response'
  }
  The AMM account rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB has 38.72983346207417 total
                  LP tokens outstanding, and uses the currency code 03451AB86CDD94767A698DD826DE28F078EE0C11.
  In its pool, the AMM holds 15 MSH.rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n
                    and 100 FOO.rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8
  ammAddress: rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB

  Requesting address from the faucet...
  Funding an issuer address with the faucet...
  Got issuer address rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/06C0703F31A726ED96A12D7F37602151CD8084C52AC8AAC32C42C2932A13D235
  Trust line created: https://devnet.xrpl.org/transactions/83C1A53EE1AEBE8640640D5C26BBE94A8E48BF000A77FAA7D20A2CF20EEA131A
  Tokens issued: https://devnet.xrpl.org/transactions/81FA97E5BB9DBB69F08E7F8018AF9737D0854E486114869250DC29EEAE74258E
  Funding an issuer address with the faucet...
  Got issuer address rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/39920495A5F4B1357D36E58EF727250ED020F1D9788DCB8D811A45CDFE270692
  Trust line created: https://devnet.xrpl.org/transactions/882D1500AA194AA46D8D09399BE9E15696BF3393DAD2B0D7F35BA6D84ACD595A
  Tokens issued: https://devnet.xrpl.org/transactions/43BE73E72EF31E06FA00538CFAFD5DD7E7EF286659A0ED215D3DDF86164D58BA
  MSH offer placed: https://devnet.xrpl.org/transactions/4C986CC4CAC05F258BD6F83C153BB145232458C10D4664341658A44171175062
  MSH offer placed: https://devnet.xrpl.org/transactions/0246023D715CC4B3AB5594909ADCB83ECC5CAEB068E1F3BA95F58EF4CCC3331F
  No AMM exists yet for the pair
            FOO.rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8 /
            MSH.rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n
            (This is probably as expected.)
  Current AMMCreate transaction cost: 2 XRP
  AMM created: https://devnet.xrpl.org/transactions/2440E92B1DA220B497DF0927310A761BF4FC769BC92341E1169E94513AF1A671
  amm_info_result2: {
    id: 99,
    result: {
      amm: {
        account: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
        amount: {
          currency: 'MSH',
          issuer: 'rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n',
          value: '15'
        },
        amount2: {
          currency: 'FOO',
          issuer: 'rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8',
          value: '100'
        },
        asset2_frozen: false,
        asset_frozen: false,
        auction_slot: {
          account: 'rzKW653XWjjZSe1kGWshBMehALvemQbsM',
          discounted_fee: 50,
          expiration: '2023-12-05T03:02:02+0000',
          price: {
            currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
            issuer: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
            value: '0'
          },
          time_interval: 0
        },
        lp_token: {
          currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
          issuer: 'rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB',
          value: '38.72983346207417'
        },
        trading_fee: 500,
        vote_slots: [
          {
            account: 'rzKW653XWjjZSe1kGWshBMehALvemQbsM',
            trading_fee: 500,
            vote_weight: 100000
          }
        ]
      },
      ledger_hash: '188D13D54F592251B421F87E195C7B451431E762266DC48AC88A69F851D68AD0',
      ledger_index: 2182662,
      validated: true
    },
    type: 'response'
  }
  The AMM account rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB has 38.72983346207417 total
                  LP tokens outstanding, and uses the currency code 03451AB86CDD94767A698DD826DE28F078EE0C11.
  In its pool, the AMM holds 15 MSH.rfY8Yf51Hm2gqrpLn2EB7PMMKSi4GSxi6n
                    and 100 FOO.rfCCuGCStks2tabt5ThAx5ZY5Aw7fbK1Q8
  ammAddress: rfCBEVwnwbjWzNaWLPuYgo8osKCtrKRiZB
  ```

- 実際に作成した AMM の LP トークンの currency コード

  `03896C2A1B512284DC7107070447375CC3E70FB5`

## 参考文献

1. [Xumm](https://xumm.app/)
2. [XRP Faucet](https://xrpl.org/ja/xrp-testnet-faucet.html)
3. [XRP Docs](https://xrpl.org/ja/docs.html)
4. [Xumm Developer Console](https://apps.xumm.dev/)
5. [【NPM】 Numm SDK](https://www.npmjs.com/package/xumm)
6. [XRP NFT-Explorer](https://test.bithomp.com/nft-explorer)
7. [【NPM】 xrpl](https://www.npmjs.com/package/xrpl)
8. [XLP-24](https://github.com/XRPLF/XRPL-Standards/discussions/69)
9. [NFT.Storage](https://nft.storage/)
10. [NFT のミント履歴](https://test.bithomp.com/nft/00080000214300096509110EFDB01B85F3837B10BBC6B13616E5DA9C00000001)
11. [XRPL Explorer](https://livenet.xrpl.org/)
12. [6 月 25 日のブートキャンプの資料](https://speakerdeck.com/tequ/introduction-xrpl-for-ideathon)
13. [XRPL Hooks Builders - IDE](https://hooks-builder.xrpl.org/develop/1f8109c80f504e6326db2735df2f0ad6)
14. [XRPL Scan](https://xrpscan.com/)
15. [サンプルコード集](https://xrpl.org/ja/code-samples.html)
16. [XPRL 学習ポータル](https://learn.xrpl.org/)
17. [XRPL Dapp 開発に有益な開発者ツール集](https://xrpl.org/dev-tools.html)
18. [公式サイト(日本語)](https://xrpl.org/ja/index.html)
19. [ブートキャンプの詳細ページ](https://lu.ma/xrpl_builders_bootcamp)
20. [GitHub - XRPL](https://github.com/XRPLF)
21. [Xumm - ドキュメント](https://xumm.readme.io/)
22. [Youtube](https://youtube.com/channel/UC6zTJdNCBI-TKMt5ubNc_Gg)
23. [XRPL の特徴](https://xrpl.org/ja/xrp-overview.html)
24. [UNCHAIN - XRPL-NFT-Maker lession](https://app.unchain.tech/learn/XRPL-NFT-Maker/ja/0/1/)
25. [Ideathon at "【XRP LEDGER】BUIDLERS BOOTCAMP" - Akindo](https://app.akindo.io/hackathons/Be7ZEGBOWT066OJKl)
26. [Ripple 公式サイト](https://ripple.com/)
27. [xrp.cafe](https://xrp.cafe/)
28. [XRPL - チュートリアル](https://xrpl.org/tutorials.html)
29. [XRPL Summer Hackathon | Ripple](https://dorahacks.io/hackathon/xrpl-hackathon)
30. [Begin coding with XRPL and React.js](https://learn.xrpl.org/course/build-with-react-js-and-xrpl/lesson/begin-coding-with-xrpl-and-react-js/)
31. [世界初の DEX を使ってみよう！ - Zenn ](https://zenn.dev/tequ/articles/use-original-dex)
32. [awesome-xrpl - Github](https://github.com/wojake/awesome-xrpl)
33. [Trade in the Decentralized Exchange tutorial](https://xrpl.org/ja/decentralized-exchange.html)
34. [XRPL の学習フロー - Zenn](https://zenn.dev/tequ/articles/xrpl-learning-flow)
35. [XRP Ledger Faucet](https://faucet.tequ.dev/)
36. [Build A Browser Wallet Using JS](https://xrpl.org/build-a-browser-wallet-in-js.html)
37. [using-xrpljs-with-vite-react Config](https://github.com/XRPLF/xrpl.js/blob/main/UNIQUE_SETUPS.md#using-xrpljs-with-vite-react)
38. [xrpl.js の詳細ページ](https://js.xrpl.org/)
39. [Issue a Fungible Token SampleCode - GitHub](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/issue-a-token/)
40. [Trade in the Decentralized Exchange SampleCode - GitHub](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/trade-in-the-decentralized-exchange/)
41. [awesome-xrpl](https://github.com/wojake/awesome-xrpl)
42. [CodeSandBox @nice-xrpl/react-xrpl](https://codesandbox.io/examples/package/@nice-xrpl/react-xrpl)
43. [【GitHub】XummSDK-React-Demo](https://github.com/XRPL-Labs/XummSDK-React-Demo/tree/main)
44. [【GitHub】xrpl-dex-dex](https://github.com/tequdev/xrpl-dex-sdk)
45. [【GitHub】create AMM](https://github.com/XRPLF/xrpl-dev-portal/tree/master/content/_code-samples/create-amm/)
46. [Create an Automated Market Maker](https://xrpl.org/create-an-automated-market-maker.html#1-connect-to-the-network)
47. [トランザクションタイプ](https://xrpl.org/ja/transaction-types.html)
48. [XRPL ドキュメント - AMMBid](https://xrpl.org/ammbid.html)
49. [XRPL ドキュメント - AMMCreate](https://xrpl.org/ammcreate.html)
50. [XRPL ドキュメント - AMMDelete](https://xrpl.org/ammdelete.html)
51. [XRPL ドキュメント - AMMDeposit](https://xrpl.org/ammdeposit.html)
52. [XRPL ドキュメント - AMMVote](https://xrpl.org/ammvote.html)
53. [XRPL ドキュメント - AMMWithdraw](https://xrpl.org/ammwithdraw.html)
54. [XRPL のトランザクションコード](https://zenn.dev/tequ/articles/rippled-transaction-code)
55. [Paths に関するサンプルソースコード](https://github.com/XRPLF/xrpl-dev-portal/blob/master/content/_code-samples/paths/js/paths.ts)
56. [XRPL エラーコード](https://xrpl.org/ja/tem-codes.html)
57. [Web3Auth - XRPL Provider](https://web3auth.io/docs/sdk/helper-sdks/providers/xrpl/)
58. [【GitHub】xrpl-modal-example](https://github.com/Web3Auth/web3auth-pnp-examples/tree/main/web-modal-sdk/blockchain-connection-examples/xrpl-modal-example)
59. [Ripple Docs Automated Market Maker](https://opensource.ripple.com/docs/xls-30d-amm/amm-uc/)
60. [TailwindCSS Component live preview](https://tailwindui.com/components/preview)
61. [【Supabase】Build a User Management App with Next.js](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs?database-method=dashboard&language=ts#project-setup)
62. [Use Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
63. [NextUi Dropdown](https://nextui.org/docs/components/dropdown)
64. [tem-code 一覧](https://xrpl.org/tem-codes.html)
65. [Currency Code に関する命名規則](https://xrpl.org/currency-formats.html#currency-codes)
66. [XRPL エラーコード tecPATH_DRY](https://xrpl.org/tec-codes.html#tecPATH_DRY)
67. [XRPL トラストラインの定義](https://xrpl.org/ja/trust-lines-and-issuing.html#:~:text=%E3%83%88%E3%83%A9%E3%82%B9%E3%83%88%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%A8%E3%81%AF%E3%80%81XRP,%E3%82%92%E5%BC%B7%E5%88%B6%E3%81%99%E3%82%8B%E3%82%82%E3%81%AE%E3%81%A7%E3%81%99%E3%80%82)
68. [XRPL トラストライン](https://xrpl.org/ja/trustset.html)
69. [Rippling](https://xrpl.org/ja/rippling.html)
70. [XRP Ledger で独自トークンを作成してみよう](https://zenn.dev/tequ/articles/issue-xrpl-token)
71. [CrossMark - Docs](https://docs.crossmark.io/docs)
72. [Typescript で実装する supabase + next.js のクイックスタート](https://zenn.dev/dragonarrow/articles/7ee574bfc92f20)
