defmodule Tedious do
  require Logger

  def main(args) do
    {_, args, _} =  OptionParser.parse(args)
    # args catch arguments without flags
    args |> process
  end

  def process(arg) do
    modle = [Atom.to_string(__MODULE__), String.capitalize(hd(arg))] |> Module.concat
    try do
      atm = String.to_existing_atom(hd(tl(arg)))
      apply(modle, atm, [])
      |> inspect(pretty: true)
      |> Logger.info
    rescue
      _ in ArgumentError -> IO.puts "Operation doesn't exist"
    end
  end
end

defmodule Tedious.Yts do
  @url "https://yts.ag/api/v2/list_movies.json?limit=10"

  def init do
    latest
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

defmodule Tedious.Router do
  @globe_url "http://192.168.254.254/status_globe_setup1.htm"

  def stat do
    {_, %HTTPoison.Response{body: bd}} = HTTPoison.get @globe_url
    {data, _} = Floki.find(bd, "td") |> Enum.split(17)
    {headers, _} = Floki.find(bd, "th") |> Enum.split(17)
    Enum.zip(headers, data) 
    |> Enum.map(&trios_to_pair/1)
    |> Enum.into(%{})
  end

  def get_headers(dom_elem) do
  end

  defp trios_to_pair(x) do
    {{_,_,[h]}, {_,_,[d]}} = x
    {h, String.replace(d, "\n", "")}
  end
end
