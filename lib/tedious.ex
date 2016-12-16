defmodule Tedious do
  require Logger

  def main(args) do
    {_, args, _} =  OptionParser.parse(args)
    # args catch arguments without flags
    args |> process
  end

  def process(arg) do
    modle = [Atom.to_string(__MODULE__), String.capitalize(hd(arg))] |> Module.concat
    case Keyword.has_key? modle.module_info[:exports], String.to_atom(hd(tl(arg))) do
      true ->
        apply(modle, String.to_existing_atom(hd(tl(arg))), [])
        |> inspect(pretty: true)
        |> Logger.info
      false ->
        IO.puts "unknown operation: #{hd(tl(arg))}"
    end
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

  defp trios_to_pair(x) do
    {{_,_,[h]}, {_,_,[d]}} = x
    {h, String.replace(d, "\n", "")}
  end
end
