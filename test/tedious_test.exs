defmodule Ping do
  def start do
    receive do
      {:pong, pid} -> send pid, {:ping, self}
    end
  end
end

defmodule TediousTest do
  use ExUnit.Case
  doctest Tedious

  test "Responds to ping" do
    ping = spawn_link Ping, :start, []
    send ping, {:pong, self}
    assert_receive {:ping, ping}
  end

  test "Router args" do
  end
end
