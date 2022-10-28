import { describe, test, expect } from "vitest";

import { UseFetch } from "./UseFetch";

describe("UseFetch", () => {
  test("should return data", () => {
    const { data } = UseFetch("https://jsonplaceholder.typicode.com/todos/1");
    expect(data).toEqual({
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    });
  });
});
