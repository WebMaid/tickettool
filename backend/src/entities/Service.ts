import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { add_service_count, service_count } from "../globals";
import { ServiceHistory } from "./ServiceHistory";
import { Ticket } from "./Ticket";
@ObjectType()
@Entity()
export class Service extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  service_id: string;

  @Field(() => String)
  @Column()
  name: string;
  // responsible user
  // representive user
  // department
  // service times
  // support times
  // criticalities

  @Field(() => [ServiceHistory])
  @OneToMany((type) => ServiceHistory, (th) => th.action)
  histories: ServiceHistory[];

  @Field(() => [Ticket])
  @OneToMany((type) => Ticket, (s) => s.service)
  tickets: Ticket[];

  @BeforeInsert()
  generateNewTicketId() {
    const PREFIX = "BFS-";
    add_service_count(1);
    let service_id = service_count.toString();
    while (service_id.length != 10 - PREFIX.length) {
      service_id = "0" + service_id;
    }
    this.service_id = PREFIX + service_id;
  }
}
