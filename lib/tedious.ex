defmodule Tedious do
  @globe_url "http://192.168.254.254/status_globe_setup1.htm"
  def init() do
    {_, %HTTPoison.Response{body: bd}} = HTTPoison.get @globe_url
    {data, _} = Floki.find(bd, "td") |> Enum.split(17)
    {headers, _} = Floki.find(bd, "th") |> Enum.split(17)
    Enum.zip(headers, data) 
    |> Enum.map(fn(x) ->
        {{_,_,[h]}, {_,_,[d]}} = x
        {h, d}
      end) 
    |> Enum.into(%{})
  end
end
