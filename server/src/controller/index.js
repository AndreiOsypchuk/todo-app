import {User, TodoList} from '../dbconfig';
import {tokenize, encrypt, compare} from './utils';
import jwt from 'jsonwebtoken';
export class UserController {
  static async Register(args, _, res) {
    try {
      const {name, email, password} = args;
      if (name && email && password) {
        const exists = await User.countDocuments({email});
        if (!exists) {
          const hash = await encrypt(password);
          const newUser = new User({...args, password: hash});
          const newTodoList = new TodoList({
            owner: newUser._doc._id,
          });
          newTodoList.save();
          const aToken = tokenize({id: newUser._doc._id}, '15m');
          const rToken = tokenize({id: newUser._doc._id}, '1d');
          newUser.addToken(rToken);
          newUser.save();
          res.cookie('acc', aToken, {maxAge: 36000 * 15});
          res.cookie('ref', rToken, {maxAge: 3600000 * 24});
          return {
            _id: newUser._doc._id,
          };
        } else {
          throw new Error('user already exists');
        }
      } else {
        throw new Error('invalid entries');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async Login(args, _, res) {
    try {
      const {email, password} = args;
      if (email && password) {
        const user = await User.findOne({email});
        const match = user ? await compare(password, user._doc.password) : null;
        if (user && match) {
          const todos = await TodoList.findOne({owner: user._doc._id});
          if (todos) {
            const aToken = tokenize({id: user._doc._id}, '15m');
            const rToken = tokenize({id: user._doc._id}, '1d');
            user.addToken(rToken);
            user.save();
            res.cookie('acc', aToken, {maxAge: 36000 * 15});
            res.cookie('ref', rToken, {maxAge: 3600000 * 24});
            return {
              _id: user._doc._id,
            };
          }
        } else {
          throw new Error('wrong email or password');
        }
      } else {
        throw new Error('invalid entries');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async Refresh(req, res) {
    try {
      const {ref} = req.cookies;
      if (ref) {
        const {id} = jwt.verify(ref, process.env.JWT_SECRET);
        if (id) {
          const user = await User.findById(id);
          if (user) {
            const aToken = tokenize({id: user._doc._id}, '15m');
            res.cookie('acc', aToken, {maxAge: 36000 * 15});
            return {sucess: true, status: 'OK'};
          } else {
            throw new Error('invalid token');
          }
        } else {
          throw new Error('invalid token');
        }
      } else {
        throw new Error('invalid token');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async Logout(req, res) {
    try {
      const {ref} = req.cookies;
      if (ref) {
        const {id} = jwt.verify(ref, process.env.JWT_SECRET);
        if (id) {
          const user = await User.findById(id);
          user.deleteToken(ref);
          user.save();
          res.clearCookie('ref');
          res.clearCookie('acc');
          return {sucess: true, status: 'OK'};
        } else {
          return {sucess: true, status: 'OK'};
        }
      } else {
        return {sucess: true, status: 'OK'};
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

export class TodoController {
  static async addTodo(args, req) {
    try {
      await TodoController.verifyRequest(req, async (todos) => {
        todos.addTodo({...args});
        todos.save();
      });
      return {sucess: true, status: 'OK'};
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async deleteTodo(args, req) {
    try {
      await TodoController.verifyRequest(req, async (todos) => {
        todos.deleteTodos(args.todoIds);
        todos.save();
      });
      return {sucess: true, status: 'OK'};
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async updateTodo(args, req) {
    try {
      await TodoController.verifyRequest(req, async (todos) => {
        todos.updateTodo(args.todo);
        todos.save();
      });
      return {sucess: true, status: 'OK'};
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async getTodos(req) {
    try {
      let todoList = {};
      await TodoController.verifyRequest(req, async (todos) => {
        todoList = todos._doc.todos;
      });
      return todoList;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  static async verifyRequest(req, cb) {
    try {
      const {acc} = req.cookies;
      if (acc) {
        const {id} = jwt.verify(acc, process.env.JWT_SECRET);
        const todos = id ? await TodoList.findOne({owner: id}) : null;
        if (todos) {
          cb(todos);
        } else {
          throw new Error('no todo list was found');
        }
      } else {
        throw new Error('forbidden');
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
