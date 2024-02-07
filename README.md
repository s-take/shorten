# URL 短縮サービスアプリ

supabase で動作する URL 短縮サービスです。
https://sh.ststake.com で公開しています。

## supabase

無料枠で大丈夫です。urls というテーブルを作り、以下のような構成にしてください。

## ローカルで動かす場合

.env.local を作成し、以下を環境変数を設定してください。それぞれ supabase の管理画面から確認して入力してください。

- SUPABASE_ANON_KEY
- SUPABASE_URL

## インターネットで公開する場合

ホスティングサービス上で以下の環境変数を設定してください。CUSTOM_DOMAIN にはホスティングしているドメインを入力してください。

- CUSTOM_DOMAIN
- SUPABASE_ANON_KEY
- SUPABASE_URL
