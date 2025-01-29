export const CHARACTERS_MOCK = [
  {
    name: "Gandalf",
    avatar: "Avatar1",
    position: "left",
  },
  {
    name: "Bilbo",
    avatar: "Avatar2",
    position: "right",
  },
];

export const DIALOGS_MOCK = [
  {
    name: "Gandalf",
    text: "Hey how are you bilbo ?",
  },
  {
    name: "Bilbo",
    text: "I want my ring back !",
  },
  {
    name: "Gandalf",
    text: "You should not pass !",
  },
];

export const MAGIC_WORDS_MOCKS = {
    dialogue: DIALOGS_MOCK,
    characters: CHARACTERS_MOCK
}

export const BLUE_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAArSURBVChTY2RY9IIBN2CC0gwM/2LEoCwkgJBmWvIKykICCGmsYKhKMzAAANo+BJ4o3uF5AAAAAElFTkSuQmCC";

export const RED_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAfSURBVChTY3gro4IHIaT//fsHZ8MR0bqxoqEqLaMCAGZwd2KRF29IAAAAAElFTkSuQmCC";


export const CONFIG_MOCKS  = {
  textures: [
    {key: "blue", url: BLUE_BASE64},
    {key: "red", url: RED_BASE64},
  ]
};

export function mockFetch() {

  spyOn(window, "fetch").and.callFake(
    (input) => {
      if( input === "./config.json" )
        return Promise.resolve(new Response(JSON.stringify(CONFIG_MOCKS)))
      else if( input === "https://private-624120-softgamesassignment.apiary-mock.com/magicwords"){
        return Promise.resolve(new Response(JSON.stringify(MAGIC_WORDS_MOCKS)))
      }
      else{
        return Promise.resolve(new Response(JSON.stringify({})))
      }
    }
  );
  // spyOn(window, "fetch").and.returnValue(fakeJSON);
}

export function test(): void {}
