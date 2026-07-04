import connectDb from "../../ConnectDb";
import bcrypt from 'bcryptjs'
import User from "@/models/User";



export async function POST(request) {
    const body = await request.json();

    console.log(body);


    await connectDb();

    try{
        const {name, email, password, confirmpassword} = body

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name: name,
            email: email,
            password: hash
        })

        return new Response(JSON.stringify({ newUser }), {status: 200})
        // return new Response(JSON.stringify({data: body}))
    }catch(err){
        console.log("not able to create user ERR:  ", err);
        return new Response(JSON.stringify({ message: "not able to create user"}), {status: 500})
    }

}