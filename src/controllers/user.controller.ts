import { userService } from "../services/user.service";

export const userController = {
  async getAllUsers(req: any) {
    const users = await userService.getAllUsers();
    return Response.json(users);
  },

  async getUserById(req: any, res?: any) {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    if (user) {
      return Response.json(user);
    } else {
      return new Response("404 Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },

  async createUser(req: Request, res?: any) {
    return req.json().then(async (body) => {
      // Ora body è un oggetto JavaScript
      const { email, firstName, lastName, age } = body;
      try {
        const now = new Date();
        const newUser = await userService.createUser({
          email,
          firstName,
          lastName,
          age,
          createdAt: now,
          updatedAt: now,
        });
        return Response.json(newUser);
      } catch (error) {
        console.error(error);
        return new Response("Could not create user", {
          status: 400,
          headers: { "Content-Type": "text/plain" },
        });
      }
    });
  },

  async deleteUser(req: any, res?: any) {
    const id = parseInt(req.params.id, 10);
    try {
      console.error("id:" + id);

      const user = await userService.deleteUser(id);
      // return Response.json(undefined), { status: 204 };
      return new Response(undefined, {
        status: 204,
      });
    } catch (error) {
      console.error(error);
      return new Response("404 Not Found", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
};
