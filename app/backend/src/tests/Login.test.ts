import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";

chai.use(chaiHttp);

const { expect } = chai;

describe("Testando a parte de login", () => {
  it("Testando oq acontece se o usuário não escrever o email", async () => {
    const email = await chai
      .request(app)
      .post("/login")
      .send({ email: "", password: "corintias_1234" });
    expect(email.status).to.equal(400);
    expect(email.body).to.deep.equal({ message: "All fields must be filled" });
  });
  it("Testando oq acontece se o usuário não escrever a senha", async () => {
    const password = await chai
      .request(app)
      .post("/login")
      .send({ email: "corintias@gmail.com", password: "" });
    expect(password.status).to.equal(400);
    expect(password.body).to.deep.equal({
      message: "All fields must be filled",
    });
  });
  it("Verificando se utilizando dados inválidos retorna uma mensagem de erro", async () => {
    const data = await chai
      .request(app)
      .post("/login")
      .send({ email: "corintias@gmail.com", password: "vaxcoDagama" });
    expect(data.status).to.equal(401);
    expect(data.body).to.deep.equal({ message: "Invalid email or password" });
  });
  it("Verificando se utilizando dados válidos o login do user acontece", async () => {
    const test = await chai
      .request(app)
      .post("/login")
      .send({ email: "user@user.com", password: "secret_user" });
    expect(test.status).to.equal(200);
    expect(test.body).to.have.property("token");
  });
  it("Verificando se utilizando dados válidos o login do admin acontece", async () => {
    const test = await chai
      .request(app)
      .post("/login")
      .send({ email: "admin@admin.com", password: "secret_admin" });
    expect(test.status).to.equal(200);
    expect(test.body).to.have.property("token");
  });
});
