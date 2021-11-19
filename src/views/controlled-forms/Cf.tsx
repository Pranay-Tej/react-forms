import Select from "@/components/Select";
import TextInput from "@/components/TextInput";
import RadioGroup from "@/components/RadioGroup";
import React from "react";
import CheckboxGroup from "@/components/CheckboxGroup";

const Cf = () => {
  const [username, setUsername] = React.useState("");
  const [country, setCountry] = React.useState();
  const [plan, setPlan] = React.useState();
  const [interestList, setInterestList] = React.useState([]);
  const [addonList, setAddonList] = React.useState([]);

  return (
    <>
      <h2>Controlled Forms without Library</h2>

      <h3>Text Input</h3>
      <TextInput
        name="Username"
        type="text"
        value={username}
        control={setUsername}
      />

      <p>Name: {username}</p>

      <hr />

      <h3>Select</h3>

      <h4>Single Select</h4>
      <Select
        name="Country"
        value={country}
        control={setCountry}
        options={[
          { label: "India", value: "India" },
          { label: "US", value: "US" },
          { label: "Australia", value: "Australia" },
        ]}
      />
      <p>Country: {country}</p>

      <h4>Multi Select</h4>
      <Select
        name="Interests"
        value={interestList}
        control={setInterestList}
        multiple={true}
        options={[
          { label: "Drawing", value: "Drawing" },
          { label: "Games", value: "Games" },
          { label: "Movies", value: "Movies" },
        ]}
      />
      <p>
        [
        {interestList.map((interest, index) => (
          <span key={interest}>
            {interest}
            {index < interestList.length - 1 ? ", " : ""}
          </span>
        ))}
        ]
      </p>

      <hr />

      <h3>Radio Group</h3>
      <p>Choose a plan</p>

      <RadioGroup
        name="Plan"
        options={[
          { label: "Silver", value: "Silver" },
          { label: "Gold", value: "Gold" },
          { label: "Diamond", value: "Diamond" },
        ]}
        control={setPlan}
        value={plan}
      />
      <p>Plan: {plan}</p>

      <hr />

      <h3>Checkbox Group</h3>
      <p>Choose Addons</p>

      <CheckboxGroup
        name="Addons"
        options={[
          { label: "Laptop", value: "Laptop" },
          { label: "Mobile", value: "Mobile" },
          { label: "PC", value: "PC" },
        ]}
        control={setAddonList}
        value={addonList}
      />
      <p>
        [
        {addonList.map((addon, index) => (
          <span key={addon}>
            {addon}
            {index < addonList.length - 1 ? ", " : ""}
          </span>
        ))}
        ]
      </p>
    </>
  );
};

export default Cf;
