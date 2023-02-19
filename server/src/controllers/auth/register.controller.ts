import { sign } from 'crypto';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';


export const registerController : (fastify:FastifyInstance) => (req:FastifyRequest , rep:FastifyReply) => void  =  (fastify:FastifyInstance) => {
  return function(req:FastifyRequest,rep:FastifyReply){
  }
}
