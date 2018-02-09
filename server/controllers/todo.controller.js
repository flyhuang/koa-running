import models from '../models'

export async function create(ctx) {
    ctx.status = 201;
}

export async function update(ctx) {
    ctx.status = 204;
}

export async function remove(ctx) {
    ctx.status = 204;
}

export async function get(ctx) {
    ctx.status = 200;
    ctx.body = {}
}

export async function list(ctx) {
    const res = await models.Todo.findAll()
    ctx.status = 200;
    ctx.body = res
}



