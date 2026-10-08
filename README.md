## スプレッドシート更新対応 スライダー付き特集ページ

非エンジニアの運用担当者がコードをいじらずにコンテンツを更新できる仕組みにしサイト制作した
- **データ管理用スプレッドシート: [https://docs.google.com/spreadsheets/d/1-cPg8OKw0QyiSoNO1LStnzd3HXNEeOm9FzLO_ls192g/edit?pli=1&gid=0#gid=0]

##  特徴

- **GAS（Google Apps Script）を活用した自動データ連携: Googleスプレッドシート上の管理データをGASで自動処理・整形し、フロントエンドで扱いやすい軽量なJSONエンドポイント（REST API化）として出力する基盤を構築。
- **JSON駆動型スライダー (Splide.js): 外部のJSONデータを fetch APIで非同期取得し、Splide ライブラリを用いてスライダー要素を動的に描画。
- **サイトのソースコードを触らずにデータ更新が行えるため、運用コストの削減と更新作業時の事故（コード破壊）リスクを排除。
- **アクセシビリティ配慮: レスポンシブ対応およびSplideによるキーボード操作・スクリーンリーダー対応の標準化。

##  技術構成

- **フロントエンド: HTML5, CSS3, JavaScript (ES6+)
- **ライブラリ: Splide.js
- **バックエンド / データ管理: Google Apps Script (GAS), Google Sheets (データソース / API化)
- **データ通信: Fetch API (JSON取得)
- **ホスティング・デプロイ: GitHub Pages
