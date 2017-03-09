defmodule Tedious.Router do
  alias IO.ANSI
  # TODO:
  # - DONE: convert module into a process
  # - store in DB the intervals for checking router status
  # - DONE: standard interfaces start, start_link, loop, cancel, change_interval
  # - DONE: get timestamp when the query was made
  @globe_url "http://192.168.254.254/status_globe_setup1.htm"

  def start_link(delay \\ 60) do
    spawn_link(__MODULE__, :init, [self(), delay])
  end

  def init(parent, delay) do
    loop(parent, delay)
  end

  def cancel(pid) do
    ref = Process.monitor(pid)
    send pid, {self(), ref, :cancel}
    receive do
      {ref, :ok} -> 
        Process.demonitor(ref, [:flush])
    end
  end

  def loop(parent, delay) do
    receive do
      {parent, ref, :cancel} ->
        send parent, {ref, :ok}
    after delay * 1_000 ->
      IO.puts inspect init()
      loop(parent, delay)
    end
  end

  def init do
    {_, %HTTPoison.Response{body: body}} = HTTPoison.get @globe_url
    {data, headers} = {get_router_data(body, "td"), get_router_data(body, "th")}
    Enum.zip(headers, data) 
    |> Enum.map(&trios_to_pair/1)
    |> format_log()
    |> print_status()
  end

  def get_router_data(body, tag) do
    {data, _} = Floki.find(body, tag) |> Enum.split(17)
    data
  end

  def print_status(data) do
    IO.puts today()
    Enum.each(data, fn x -> IO.puts x end)
  end

  def format_log(data) do
    Enum.map(data, fn {header, d} -> "#{header}: #{d}" end) 
  end

  defp format_date_today(dte) do
    {{year,month,day}, {hour,minute,second}} = dte
    "#{year}/#{month}/#{day} #{hour}:#{minute}:#{second}"
  end

  defp add_color(str) do
    ANSI.color(2) <> str <> "\e[39m"
  end

  defp today do
    :calendar.local_time()
    |> format_date_today
    |> add_color
  end

  defp trios_to_pair(x) do
    {{_,_,[h]}, {_,_,[d]}} = x
    {h, String.replace(d, "\n", "")}
  end
end
