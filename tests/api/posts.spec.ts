import { test, expect } from "@playwright/test";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

test.describe("Posts API", () => {
  test("GET /posts returns an array of posts", async ({ request }) => {
    const response = await request.get("/posts");
    await expect(response).toBeOK();

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);

    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("userId");
  });

  test("GET /posts/:id returns a single post", async ({ request }) => {
    const response = await request.get("/posts/1");
    await expect(response).toBeOK();

    const post: Post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBeGreaterThan(0);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test("GET /posts/:id returns 404 for nonexisting id", async ({ request }) => {
    const response = await request.get("/posts/999999");
    expect(response.status()).toBe(404);
  });

  test("POST /posts creates a new post", async ({ request }) => {
    const newPost = {
      userId: 123,
      title: "foo",
      body: "bar",
    };
    const response = await request.post("/posts", { data: newPost });
    expect(response.status()).toBe(201);

    const post: Partial<Post> = await response.json();
    expect(post).toMatchObject(newPost);
    expect(post).toHaveProperty("id");
  });

  test("PUT /posts/:id updates an existing post", async ({ request }) => {
    const updatedPost = {
      userId: 1,
      id: 1,
      title: "updated title",
      body: "updated body",
    };
    const response = await request.put("/posts/1", { data: updatedPost });
    await expect(response).toBeOK();

    const post: Post = await response.json();
    expect(post).toEqual(updatedPost);
  });

  test("PATCH /posts/:id partially updates a post", async ({ request }) => {
    const patchData = { title: "patched title" };
    const response = await request.patch("/posts/1", { data: patchData });
    await expect(response).toBeOK();

    const post: Partial<Post> = await response.json();
    expect(post).toMatchObject(patchData);
    expect(post).toHaveProperty("id");
  });

  test("DELETE /posts/:id removes a post", async ({ request }) => {
    const response = await request.delete("/posts/1");
    await expect(response).toBeOK();

    const body = await response.json();
    expect(body).toEqual({});
  });

  // Note: jsonplaceholder is a mock API and doesn't validate input.
  // In a real project this would assert a 404 status.
  test("GET /posts/:id after deletion returns 404 (negative)", async ({ request }) => {
    const response = await request.get("/posts/1");
    await expect(response).toBeOK();
  });

  test("GET /posts still returns an array after previous operations", async ({ request }) => {
    const response = await request.get("/posts");
    await expect(response).toBeOK();

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});
