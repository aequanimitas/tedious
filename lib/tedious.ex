defmodule Tedious do
  require Logger

  # $ ./tedious yts
  # $ ./tedious router
  def main(args) do
    {_, args, _} =  OptionParser.parse(args)
    # args catch arguments without flags
    args |> process
  end

  def process(arg) do
    modle = [Atom.to_string(__MODULE__), String.capitalize(hd(arg))] |> Module.concat
    apply(modle, :init, [])
      |> inspect(pretty: true)
      |> Logger.info
  end
end

defmodule Tedious.Yts do
  @url "https://yts.ag/api/v2/list_movies.json?limit=10=quality=1080p"

  def init do
    latest()
    |> decode
    |> get_movies
    |> Enum.map(&Tedious.Yts.description/1)
  end

  def latest do
    {_, %HTTPoison.Response{body: body}} = HTTPoison.get @url
    body
  end

  def description(data) do 
    %{
      "date_added" => data["date_uploaded_unix"] |> DateTime.from_unix(),
      "rating" => data["rating"], 
      "title" => data["title_english"]
    }
  end

  def get_movies(lst) do
    lst["data"]["movies"]  
  end

  def decode(body) do
    Poison.decode! body
  end
end
