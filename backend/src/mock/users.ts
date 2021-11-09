import { Not } from "typeorm";
import { Department } from "../entities/Department";
import { User } from "../entities/User";

export const addMockUsers = async () => {
  if ((await User.find()).length > 7) return;
  if ((await Department.count()) != 1) {
    Department.delete({ name: Not("I411") });
  }
  const i371_in = await Department.insert(new Department("I371"));
  const p114_in = await Department.insert(new Department("P114"));
  const i221_in = await Department.insert(new Department("I221"));
  const i37_in = await Department.insert(new Department("I37"));
  const i3_in = await Department.insert(new Department("I3"));
  const p123_in = await Department.insert(new Department("P123"));

  await User.insert(
    new User(
      "hoferfr",
      "Hofer Frederic",
      "frederic.hofer@post.ch",
      "12345",
      i371_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "utzluc",
      "Utz Luca",
      "luca.utz@post.ch",
      "12345",
      p114_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "carrerja",
      "Carrer Jamie",
      "jamie.carrer@post.ch",
      "12345",
      p114_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "saegesserjo",
      "Sägesser Jonas",
      "jonas.saegesser@post.ch",
      "12345",
      i221_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "buridav",
      "Buri David",
      "david.buri@post.ch",
      "12345",
      i37_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "wolfgangul",
      "Wolfgang Ulrich",
      "ulrich.wolfgang@post.ch",
      "12345",
      i3_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "burrila",
      "Burri Laura",
      "laura.burri@post.ch",
      "12345",
      p123_in.identifiers[0].id
    )
  );
  await User.insert(
    new User(
      "meierlu",
      "Meier Lukas",
      "lukas.meier@post.ch",
      "12345",
      i221_in.identifiers[0].id
    )
  );
};
