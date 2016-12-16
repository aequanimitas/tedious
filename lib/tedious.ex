defmodule Tedious do
  require Logger

  def main(args) do
    {_, args, _} =  OptionParser.parse(args)
    # args catch arguments without flags
    args |> process
  end

  def process(arg) do
    [Atom.to_string(__MODULE__), String.capitalize(hd(arg))]
    |> Module.concat
    |> apply(String.to_existing_atom(hd(tl(arg))), [])
    |> inspect(pretty: true)
    |> Logger.info
  end


  defmodule Router do
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

  defmodule Reddit do
    @reddit_url "http://www.reddit.com/r/"

    @doc """
      Try meta-programming here
    """
    def ph do
      "Not yet implemented"
    end
  end
end

