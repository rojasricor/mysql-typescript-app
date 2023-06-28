import { Request, Response } from "express";
import { connect } from "../db";
import { IPost } from "../interfaces/IPost";

export async function getPosts(req: Request, res: Response): Promise<Response> {
  const conn = connect();
  const [posts] = await conn.query("SELECT * FROM posts");
  return res.json(posts);
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response> {
  const newPost: IPost = req.body;
  const conn = connect();
  await conn.query("INSERT INTO posts SET ?", [newPost]);
  return res.json({ message: "Post Created" });
}

export async function getPost(req: Request, res: Response): Promise<Response> {
  const id = req.params.postId;
  const conn = connect();
  const [post] = await conn.query("SELECT * FROM posts WHERE id = ?", [id]);
  return Array.isArray(post) ? res.json(post[0]) : res.json(post);
}

export async function deletePost(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.postId;
  const conn = connect();
  await conn.query("DELETE FROM posts WHERE id = ?", [id]);
  return res.json({ message: "Post deleted" });
}

export async function updatePost(req: Request, res: Response) {
  const id = req.params.postId;
  const updatePost: IPost = req.body;
  const conn = connect();
  await conn.query("UPDATE posts SET ? WHERE id = ?", [updatePost, id]);
  return res.json({ message: "Post updated" });
}
