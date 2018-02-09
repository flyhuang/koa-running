import * as controller from "../../controllers/todo.controller";
import Router from "koa-router";

export default (apiRouter) => {
    const router = new Router({prefix: '/todo'});

    router.get('/', controller.list);
    router.get('/:id', controller.get);
    router.post('/', controller.create);
    router.delete('/:id', controller.remove);
    router.put('/:id', controller.update);

    apiRouter.use(router.routes(), router.allowedMethods());
};

