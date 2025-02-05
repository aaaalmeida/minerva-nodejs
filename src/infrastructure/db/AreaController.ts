import { Driver, Session } from "neo4j-driver"
import { Neo4jConnection } from "./Neo4jConnection"
import IArea from "@domain/IArea"
import { v4 as uuidv4 } from 'uuid'

class AreaController {
    driver: Driver | null = null
    session: Session | null = null

    constructor(private dbConnection: Neo4jConnection) { }

    async init() {
        this.driver = await this.dbConnection.initDriver()
    }

    async insertArea(area: IArea) {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getWriteSession()
            const { records } = await this.session.run(
                'CREATE (newArea: Area $props) RETURN newArea',
                { props: area }
            )
            return records
        } catch (e) { throw e }
    }

    async deleteArea(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()
            await this.session.run(
                'MATCH (area: Area {uuid: $id}) DELETE area RETURN area',
                { id: id }
            )
        } catch (e) {
            throw e
        }
    }

    async findAreaByElementID(id: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getReadSession()
            const { records } = await this.session.run(
                "MATCH (area:Area {uuid: $id}) RETURN area",
                { id: id }
            )
            return records
        } catch (e) { throw e }
    }

    async matchAllArea() {
        try {
            if (!this.driver) await this.init()
            this.session = this.dbConnection.getReadSession()
            // const { records } = await this.session.run("MATCH (area: Area) RETURN area.uuid, area.name")
            const { records } = await this.session.run("MATCH (area: Area) RETURN area")
            // return records.map(r => {uuid: r._fields.uuid, name: r._fields.name})
            return records.map(item => item.get('area').properties);
        } catch (e) { throw e }
    }

    async alterAreaProperties(area: Partial<IArea>, uuid: string) {
        try {
            if (!this.driver) await this.init()

            this.session = this.dbConnection.getWriteSession()

            return await this.session.run(
                "MATCH (n: Area {uuid: $uuid}) SET ${area} RETURN n",
                { uuid: uuid, area: area }
            )
        } catch (e) { throw e }
    }
}

export default AreaController