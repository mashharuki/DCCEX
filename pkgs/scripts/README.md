# AMM用のサンプルスクリプト

- AMMの機能を試すスクリプト

  ```bash
  pnpm run create-amm
  ```

  各トランザクションの記録は下記の実行結果例から確認のこと！

  実行結果例

  ```bash
  Requesting address from the faucet...
  Funding an issuer address with the faucet...
  Got issuer address rsnii4WeG6R3CbdmT1MK8Go4uEpJrY3aMQ.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/38C5F59BD2CDFA44F85683602FC9690F5E0BDF0B8F55492B4C237D8231E4B56E
  Trust line created: https://devnet.xrpl.org/transactions/6456CE61AD995DE35BF83C6929BA81EC408670D0B5D85BDCE437189AD8AC53A0
  Tokens issued: https://devnet.xrpl.org/transactions/660C14ACB81CDC1280261A3146C4F326D6CFEA218BE3A6DA35BF295C8402FC10
  TST offer placed: https://devnet.xrpl.org/transactions/532E94BCA33B0B9DB6CFD418CEEA00DA49954DD979041065617605312D4BF2DC
  Funding an issuer address with the faucet...
  Got issuer address rnMCLHn7b8AqB8hSExGZVkU4Btus9DEMpe.
  Issuer DefaultRipple enabled: https://devnet.xrpl.org/transactions/08A7E1B451817BC0B18F5B5D20B7614EC9A9F775652602E9014C7184F723EA76
  Trust line created: https://devnet.xrpl.org/transactions/828D308B4186EFC784AB08F087EBD4B00908378E49008168D463F58B281716CB
  Tokens issued: https://devnet.xrpl.org/transactions/A2EDC9A9109769096AC97AF7ABB598A259F556FA657C59F28A35C12F30F70BDC
  No AMM exists yet for the pair
                    FOO.rnMCLHn7b8AqB8hSExGZVkU4Btus9DEMpe /
                    MSH.rsnii4WeG6R3CbdmT1MK8Go4uEpJrY3aMQ
                    (This is probably as expected.)
  Current AMMCreate transaction cost: 2 XRP
  AMM created: https://devnet.xrpl.org/transactions/D81DBF603DA92C6CE636555D4BD5B8CD9FAC1019172DAC4D9E1ACCD7C27F7BAC
  amm_info_result2: {
    id: 102,
    result: {
      amm: {
        account: 'rPvYJngSTfaBKQ7xifWWoVLphjoATS2ibS',
        amount: {
          currency: 'MSH',
          issuer: 'rsnii4WeG6R3CbdmT1MK8Go4uEpJrY3aMQ',
          value: '15'
        },
        amount2: {
          currency: 'FOO',
          issuer: 'rnMCLHn7b8AqB8hSExGZVkU4Btus9DEMpe',
          value: '100'
        },
        asset2_frozen: false,
        asset_frozen: false,
        auction_slot: {
          account: 'rw65Wsw3CCUAUwU1tAbsv9tUm8AHxYb4VK',
          discounted_fee: 50,
          expiration: '2023-11-04T01:50:41+0000',
          price: {
            currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
            issuer: 'rPvYJngSTfaBKQ7xifWWoVLphjoATS2ibS',
            value: '0'
          },
          time_interval: 0
        },
        lp_token: {
          currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
          issuer: 'rPvYJngSTfaBKQ7xifWWoVLphjoATS2ibS',
          value: '38.72983346207417'
        },
        trading_fee: 500,
        vote_slots: [
          {
            account: 'rw65Wsw3CCUAUwU1tAbsv9tUm8AHxYb4VK',
            trading_fee: 500,
            vote_weight: 100000
          }
        ]
      },
      ledger_hash: 'BF1440B347DECD84C06E7A2F48CC19A0FF15D71BBEAD046006E4B504875B5128',
      ledger_index: 1284930,
      validated: true
    },
    type: 'response'
  }
  The AMM account rPvYJngSTfaBKQ7xifWWoVLphjoATS2ibS has 38.72983346207417 total
                LP tokens outstanding, and uses the currency code 03451AB86CDD94767A698DD826DE28F078EE0C11.
  In its pool, the AMM holds 15 MSH.rsnii4WeG6R3CbdmT1MK8Go4uEpJrY3aMQ
                and 100 FOO.rnMCLHn7b8AqB8hSExGZVkU4Btus9DEMpe
  account_lines_result: {
    id: 103,
    result: {
      account: 'rw65Wsw3CCUAUwU1tAbsv9tUm8AHxYb4VK',
      ledger_hash: 'BF1440B347DECD84C06E7A2F48CC19A0FF15D71BBEAD046006E4B504875B5128',
      ledger_index: 1284930,
      lines: [
        {
          account: 'r9Mp9r7AWh4X55QmLEA7Sa7DQs1ichfrCU',
          balance: '1000',
          currency: 'FOO',
          limit: '10000000000',
          limit_peer: '0',
          no_ripple: false,
          no_ripple_peer: false,
          quality_in: 0,
          quality_out: 0
        },
        {
          account: 'rnMCLHn7b8AqB8hSExGZVkU4Btus9DEMpe',
          balance: '900',
          currency: 'FOO',
          limit: '10000000000',
          limit_peer: '0',
          no_ripple: false,
          no_ripple_peer: false,
          quality_in: 0,
          quality_out: 0
        },
        {
          account: 'rPvYJngSTfaBKQ7xifWWoVLphjoATS2ibS',
          balance: '38.72983346207417',
          currency: '03451AB86CDD94767A698DD826DE28F078EE0C11',
          limit: '0',
          limit_peer: '0',
          no_ripple: true,
          no_ripple_peer: false,
          quality_in: 0,
          quality_out: 0
        },
        {
          account: 'rsnii4WeG6R3CbdmT1MK8Go4uEpJrY3aMQ',
          balance: '9985',
          currency: 'MSH',
          limit: '10000000000',
          limit_peer: '0',
          no_ripple: false,
          no_ripple_peer: false,
          quality_in: 0,
          quality_out: 0
        }
      ],
      validated: true
    },
    type: 'response'
  }
  ```

## 実際にSwapした時のトランザクション

[D684FBED66E74449C8C8B9A43FBE38788F560C26F8F73E6EBABEB9EDD44C06F5](https://devnet.xrpl.org/transactions/D684FBED66E74449C8C8B9A43FBE38788F560C26F8F73E6EBABEB9EDD44C06F5)

## 実際にAMMにDepositした時のトランザクション

[2CA07EFC85DC96BC05CFDAB34454FA89120932242A237C05DB29DE2C3F6B568A](https://devnet.xrpl.org/transactions/2CA07EFC85DC96BC05CFDAB34454FA89120932242A237C05DB29DE2C3F6B568A)

## 実際にAMMからWithdrawした時のトランザクション

[3519A06BBA59E6D6B017BB465AA596BF01ABCC10D193E12830339BA93B3D9A02](https://devnet.xrpl.org/transactions/3519A06BBA59E6D6B017BB465AA596BF01ABCC10D193E12830339BA93B3D9A02)