import { userController } from "./controllers/user.controller";

export function createApp() {
  const app = Bun.serve({
    fetch(request: Request) {
      const { url, method } = request; // Destrutturazione -> definisce pathname e method che sono dentro URL;
      const pathname = new URL(url).pathname;

      if (pathname === "/users" && method === "GET") {
        return userController.getAllUsers(request);
      }

      if (pathname.startsWith("/users/") && method === "GET") {
        const id = parseInt(pathname.split("/").pop()!, 10);
        return userController.getUserById({ params: { id } });
      }

      if (pathname === "/users" && method === "POST") {
        return userController.createUser(request);
      }

      if (pathname.startsWith("/users/") && method === "DELETE") {
        const id = parseInt(pathname.split("/").pop()!, 10);
        console.log("id: ", id);
        return userController.deleteUser({ params: { id } });
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  return app;
}
