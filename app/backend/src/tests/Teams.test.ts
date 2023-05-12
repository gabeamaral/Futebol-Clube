import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import TeamService from '../service/TeamsService';

chai.use(chaiHttp);

const { expect } = chai;

describe("Testes sobre Teams", () => {
  describe("Configurando o beforeEach", () => {
    beforeEach(() => {
      sinon.restore();
    });
  });
  it("Testando o findTeams no service", async () => {
    const teams: TeamsModel[] = [new TeamsModel({ id: 3, teamName: "Batata do vasco" })];
    const findTeamsStub = sinon.stub(TeamsModel, 'findAll').resolves(teams);
    const teamService = new TeamService();
  
    const result = await teamService.findTeams();
  
    expect(findTeamsStub.calledOnceWithExactly()).to.be.true;
    expect(result).to.be.deep.eq(teams);
    expect(result).to.be.an('array');
    expect(result.length).to.be.eq(1);
  
    findTeamsStub.restore();
  });
  it("Testando o findTeams no controller", async () => {
    const teams: TeamsModel[] = [new TeamsModel({ id: 3, teamName: "Batata do vasco" })];
    sinon.stub(TeamsModel, "findAll").resolves(teams);
    const result = await chai.request(app).get("/teams");
    expect(result).to.be.an("object");
    expect(result.body).to.be.an("array");
    expect(result.body).to.be.deep.eq(teams.map((team) => team.dataValues));
  });
  it("Testando o findTeamsById no service", async () => {
    const team: TeamsModel = new TeamsModel({ id: 99, teamName: "Corintia" });
    sinon.stub(TeamsModel, "findByPk").resolves(team);
    const teamService = new TeamService();
    const result = await teamService.findTeamsById(99);
    expect(result).to.be.deep.eq(team);
    expect(result).to.be.an("object");
  });
  it("Testando o findTeamsById no controller", async () => {
    const team: TeamsModel = new TeamsModel({ id: 99, teamName: "Corintia" });
    const result = await chai.request(app).get("/teams/99");
    expect(result).to.be.an("object");
    expect(result.body).to.be.an("object");
    expect(result.body).to.be.deep.eq(team.dataValues);
  });
});