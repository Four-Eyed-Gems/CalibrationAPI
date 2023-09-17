import { Schema, model } from 'mongoose'
import { UserCreationAttributes, } from '../interface';

const UserSchema = new Schema<UserCreationAttributes>({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  refreshToken: String,
  isVerified: {
    type: Schema.Types.Boolean,
    default: false,
  },
  verification: {
    type: Schema.Types.Mixed,
    required: false,
  }
  // role: {
  //   type: Schema.Types.String,
  //   required: [true, "Role erquired Valids"],
  //   validate: {
  //     validator: (role: String) => {
  //       role = role.toLowerCase().trim();
  //       console.log("-->role", role)
  //       console.log("conditon", role != "admin" || role != "customer" || role != "vendor")
  //       if (role == "admin" || role == "customer" || role == "vendor") {
  //         console.log("if called")
  //         return true
  //       }
  //       return false;
  //     },
  //     message: "Role is Required"
  //   }
  // }
})

const Users = model("Users", UserSchema)
export default Users;