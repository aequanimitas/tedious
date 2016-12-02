defmodule Tedious do
  require Logger
  @globe_url "http://192.168.254.254/status_globe_setup1.htm"

  def main(args) do
    {_, arg, _} = OptionParser.parse(args)
    arg
    |> process
  end

  def process(arg) do
    Logger.info inspect(apply(Tedious, String.to_atom(hd arg), []), pretty: true)
  end

  def router() do
    {_, %HTTPoison.Response{body: bd}} = HTTPoison.get @globe_url
    {data, _} = Floki.find(bd, "td") |> Enum.split(17)
    {headers, _} = Floki.find(bd, "th") |> Enum.split(17)
    Enum.zip(headers, data) 
    |> Enum.map(&trios_to_pair/1)
    |> Enum.into(%{})
  end

  defp trios_to_pair(x) do
    {{_,_,[h]}, {_,_,[d]}} = x
    {h, String.replace(d, "\n", "")}
  end

end
