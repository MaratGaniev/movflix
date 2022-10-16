import React from "react";
import { getAge } from "../../helpers/getAge";

import { Facebook } from "./../decorative/icons/facebook";
import { Homepage } from "./../decorative/icons/homepage";
import { Instagram } from "./../decorative/icons/instagram";
import { JustWatch } from "./../decorative/icons/justWatch";
import { Twitter } from "./../decorative/icons/twitter";
import classes from "./personDetails.module.css";

export const PersonDetails = (props) => {
  const { items } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.info}>
        <div className={classes.block}>
          <div className={classes.socials}>
            {items.ids.facebook_id ? (
              <Facebook className={classes.social} id={items.ids.facebook_id} />
            ) : null}
            {items.ids.twitter_id ? (
              <Twitter className={classes.social} id={items.ids.twitter_id} />
            ) : null}
            {items.ids.instagram_id ? (
              <Instagram
                className={classes.social}
                id={items.ids.instagram_id}
              />
            ) : null}
            {items.homepage ? (
              <Homepage className={classes.social} link={items.homepage} />
            ) : null}

            <JustWatch className={classes.social} />
          </div>
          <h3 className={classes.title}>Personal information</h3>

          {items.known_by !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Known by</h3>
              <p className={classes.subtext}>{items.known_by}</p>
            </div>
          ) : null}
          {items.birth_day !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Birth date</h3>
              <p className={classes.subtext}>
                {items.birth_day} ({getAge(items.birth_day)} y.o)
              </p>
            </div>
          ) : null}
          {items.birth_place !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Birth place</h3>
              <p className={classes.subtext}>{items.birth_place}</p>
            </div>
          ) : null}
          {items.known_as !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Also known as</h3>
              <ul className={classes.knownAs}>
                {items.known_as.map((item) => (
                  <li className={classes.knownAsItem}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
