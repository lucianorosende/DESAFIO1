import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { sendMail } from "../utils/sendMail";
import { RecoverCodeMongooseModel } from "../DAO/MONGO/models/recover-code.model";
import { createHash } from "../utils";
import { UserMongooseModel } from "../DAO/MONGO";

class SessionService {
    async recoverPassword(req: Request) {
        const { email } = req.body;
        const code = uuidv4();
        const codeCreated = await RecoverCodeMongooseModel.create({
            email,
            code,
            expire: Date.now() + 3600000,
        });
        sendMail(
            "zickz4gbusiness@gmail.com",
            email,
            "Reactivation code",
            `<div>Click <a href="http://localhost:8080/api/sessions/email-recovery?code=${code}&email=${email}">aqui</a> para reactivar tu contraseña</div>`
        );
    }
    async emailRecovery(req: Request) {
        const { code, email } = req.query;
        const findCode = await RecoverCodeMongooseModel.findOne({
            code,
            email,
        });
        return findCode;
    }
    async changePass(req: Request) {
        const { email, password } = req.body;
        const newPassword = createHash(password);
        const findUser = await UserMongooseModel.updateOne(
            { email: email },
            { password: newPassword }
        );
    }
}

export const SessionsService = new SessionService();
