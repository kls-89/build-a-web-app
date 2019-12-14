import React from "react";
import HelpfulHint from "../components/HelpfulHint";
import Guide from "../components/Guide";
import Layout from "../components/Layout";
import "./Fire.css";
import List from "../components/List";

const Fire = props => {
  return (
    <Layout>
      <Guide>
        <main>
          <header>
            <h2>Fire Dispatch Basics</h2>
          </header>
          <section>
            <article>
              <h3>FD Overview</h3>
              <p>
                Our fire station is staffed daily between the hours of 6am -
                9pm. The number of firefighters on duty at any given time is a
                function of their availability as well as the time of day.
              </p>
            </article>
          </section>
          <section>
            <article>
              <h3>BLS vs. ALS Ambulance</h3>
              <p>
                Our fire department is the primary BLS provider for the town.
                This means that they handle all BLS medical emergencies on their
                own. Calls meeting ALS criteria (based on EMD criteria) shall
                also require the dispatcher to notify an out-of-town ALS
                ambulance for response.
              </p>
              <p>
                {" "}
                <strong>
                  NB: This is in addition to dispatching our BLS ambulance
                </strong>
                .
              </p>
            </article>
          </section>
          <section>
            <article>
              <h3>Fire vs. Medical vs. Still Alarm</h3>
              <p>
                The Fire Department asks that 3 unique tones be used, depending
                on the nature of the call as well as the time of day:
              </p>
              <List>
                <li>Fire All Call</li>
                <li>Medical</li>
                <li>Still Alarm</li>
              </List>
              <p>
                The Fire All Call tone is used for general fire alarm
                activations, actual fires (Car, House, Brush, etc), mutual aid
                requests, etc.
              </p>
              <p>
                The Medical tone is used for EMS calls, including lift assists
                with injuries, car accidents, etc.
              </p>
              <p>
                The Still Alarm tone is to be used <strong>only</strong> when
                the station is staffed. The criteria for a Still Alarm are:
              </p>
              <List>
                <li>
                  Lift Assists with <strong>NO</strong> reported injuries
                </li>
                <li>Wires Down (no smoke/fire reported)</li>
                <li>Well Being Checks</li>
                <li>
                  Carbon Monoxide (CO) alarm activations with{" "}
                  <strong>no</strong> illness reported
                </li>
                <li>Residential Lock Out assists</li>
                <li>
                  MV Lock Out assists <strong>ONLY</strong>when a child or pet
                  is locked in the vehicle (for all others, the owner will have
                  to make arrangements on their own).
                </li>
                <li>Basement Pumpouts</li>
                <li>
                  Any time someone from the fire department asks you to put out
                  a Still Tone.
                </li>
              </List>
              <p>
                If any of the Still Alarm call types happen when the station is
                not staffed, then use the appropriate alternate tone (Fire or
                Medical) and dispatch the call.
              </p>

              <HelpfulHint>
                Still Alarms are <strong>NEVER</strong> to be used on the
                overnight shift, as the station is unstaffed between 9pm and
                6am!
              </HelpfulHint>
            </article>
          </section>
          <section>
            <article>
              <h3>Working Fire Protocol</h3>
              <p>
                Facilitating interagency communications as a solo dispatcher
                during a working fire is extremely chaotic. There is a lot to do
                in a very short amount of time, so being well versed in the
                Working Fire Protocol will make your job infinitely easier when
                you handle communications during a fire.
              </p>
            </article>
          </section>
          <section>
            <article>
              <h3>Live Fire Dispatching</h3>
              <p>
                As with Police Dispatching, it is vital that you develop a
                strong ability to live dispatch for fire calls, too.
              </p>
            </article>
          </section>
          <section>
            <article>
              <h3>Mutual Aid</h3>
              <p>
                First off, you should notify District 15 Control as soon as you
                have confirmation of a working fire. They coordinate the mutual
                aid availability for every other town in our Fire District, so
                it's important for them to know when changes occur with our
                availablility or that of neighboring agencies.
              </p>
              <p>
                Follow our Mutual Aid Run Card to determine which town to
                contact for a first alarm fire, as well as what type of resource
                they should send (an Engine, a Ladder, or perhaps a RIT team),
                and where they're needed (to the scene or for station coverage).
              </p>
            </article>
          </section>
          <section>
            <article>
              <h3>Hydrants</h3>
              <p>
                One of the Fire Department's primary tasks when getting on scene
                of a working fire is to establish a secure and continuous source
                of water. Bear in mind that the pump on a typical fire engine
                can move water at a rate of up to 1000 gallons/minute. Each fire
                engine is equipped with a water tank, but this may only be 750
                gallons. It's not designed to fight an entire fire; rather, it's
                purpose is to allow firefighters to start putting water on the
                fire before they establish a continuous supply.
              </p>
              <p>
                The best source of a continuous water supply is the town's
                hydrant system. For this reason, it is critical that you alert
                the FD to the location of the nearest hydrants as soon as the
                first engine signs on the air responding.
              </p>
              <HelpfulHint>
                The Hydrant List can be found on the dispatch computer by
                navigating to the P: Drive, then to the Dispatch Computer
                folder, and then to the Fire folder.
              </HelpfulHint>
            </article>
          </section>
        </main>
      </Guide>
    </Layout>
  );
};

export default Fire;

// <section><article><h3></h3></article></section>
