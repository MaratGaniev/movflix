import React from "react";
import { Header } from "../header/header";
import classes from "./personPage.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPerson } from "../../http";

import { PersonDetails } from "../personDetails/personDetails";
import { get_cast } from "../../helpers/sortPersonRoles";
import Preloader from "../decorative/preloader/preloader";

export const PersonPage = () => {
  let dispatch = useDispatch();
  let params = useParams();
  let person_id = params.id;
  let navigate = useNavigate();
  const api_key = process.env.REACT_APP_MOVIES_API_KEY;
  let person = useSelector((state) => state.movies.currentPerson);
  let isFetching = useSelector((state) => state.movies.isFetching);

  let roles = get_cast(person.combined_credits.cast);

  useEffect(() => {
    dispatch(getPerson(api_key, person_id));
  }, [api_key, dispatch, person_id]);

  return (
    <div>
      <Header />
      {isFetching ? (
        <Preloader />
      ) : (
        <div className={classes.container}>
          <div className={classes.leftBlock}>
            <img
              className={classes.profileImage}
              src={`https://image.tmdb.org/t/p/original${person.images.profiles[0].file_path}`}
              alt={""}
            />
            <PersonDetails
              items={{
                homepage: person.homepage,
                ids: person.external_ids,
                known_by: person.known_for_department,
                birth_day: person.birthday,
                death_day: person.deathday,
                birth_place: person.place_of_birth,
                known_as: person.also_known_as,
              }}
              type="person"
            />
          </div>
          <div className={classes.rightBlock}>
            <h3 className={classes.name}>{person.name}</h3>
            <h3 className={classes.bioTitle}>Biography</h3>
            <p className={classes.bio}>{person.biography}</p>
            <h3 className={classes.rolesTitle}>Acting</h3>
            <div className={classes.rolesBlock}>
              {roles.map((role) => (
                <div className={classes.role}>
                  <h3 className={classes.roleYear}>
                    {role.release_date.getFullYear()}
                  </h3>
                  <h3 className={classes.roleName}>
                    <span
                      onClick={() => {
                        role.media_type === "tv"
                          ? navigate(
                              `/movflix/shows/page/${role.id}/${role.title}`
                            )
                          : navigate(
                              `/movflix/movies/page/${role.id}/${role.title}`
                            );
                      }}
                    >
                      {role.title}
                    </span>{" "}
                    {role.character ? `as ${role.character}` : null}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
