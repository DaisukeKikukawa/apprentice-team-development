require 'webrick'
require 'erb'

class MyServlet < WEBrick::HTTPServlet::AbstractServlet
  @@messages = []  # 投稿されたメッセージを保存するクラス変数

  def do_GET(request, response)
    response.status = 200
    response.content_type = "text/html"
    response.body = ERB.new(File.read("index.html.erb")).result(binding)
  end

  def do_POST(request, response)
    # フォームからのデータを取得して保存
    @@messages << request.query['message']

    # GETメソッドと同じ処理を行う（リダイレクトではなく、同じページを再描画）
    do_GET(request, response)
  end
end

server = WEBrick::HTTPServer.new(:Port => 8000)
server.mount "/", MyServlet
trap("INT") { server.shutdown }
server.start
