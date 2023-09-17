import { Schema, model } from 'mongoose'
import { UserInstance, } from '../interface';

const UserSchema = new Schema<UserInstance>({
  email: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true
  },
  refreshToken: String
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

const User = model("User", UserSchema)
export default User;