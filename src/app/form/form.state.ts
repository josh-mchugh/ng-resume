import { Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import ShortUniqueId from 'short-unique-id';
import { Form } from '@form/form.actions';
import { FormStateConfig } from '@form/form.config';
import { Resume } from '@resume/resume.actions';
import { SelectorType } from '@resume/selector-type.enum';

export interface FormStateModel {
  name: string;
  title: string;
  summary: string;
  phone: string;
  email: string;
  location: string;
  socials: Socials;
  experiences: Experiences;
  experienceDescriptions: ExperienceDescriptions;
  experienceSkills: ExperienceSkills;
  skills: Skills;
  certifications: Certifications;
}

interface Socials {
  byId: { [id: string]: FormSocial };
  allIds: string[];
}

export interface FormSocial {
  id: string;
  name: string;
  url: string;
}

interface Experiences {
  byId: { [id: string]: FormExperience };
  allIds: string[];
}

export interface FormExperience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  location: string;
  rawDescription: string;
  rawSkills: string;
}

interface ExperienceDescriptions {
  byId: { [id: string]: FormExperienceDescription };
  allIds: string[];
}

export interface FormExperienceDescription {
  id: string;
  experienceId: string;
  position: number;
  value: string;
}

interface ExperienceSkills {
  byId: { [id: string]: FormExperienceSkill };
  allIds: string[];
}

export interface FormExperienceSkill {
  id: string;
  experienceId: string;
  position: number;
  value: string;
}

interface Skills {
  byId: { [id: string]: FormSkill };
  allIds: string[];
}

export interface FormSkill {
  id: string;
  name: string;
  proficiency: number;
}

interface Certifications {
  byId: { [id: string]: FormCertification };
  allIds: string[];
}

export interface FormCertification {
  id: string;
  title: string;
  organization: string;
  year: string;
  location: string;
}

@State<FormStateModel>({
  name: 'form',
  defaults: FormStateConfig.DEFAULT,
})
@Injectable()
export class FormState {
  private uuid: ShortUniqueId;

  constructor() {
    this.uuid = new ShortUniqueId();
  }

  static getSocials(): (state: FormStateModel) => FormSocial[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.socials.byId),
    );
  }

  static getExperiences(): (state: FormStateModel) => FormExperience[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.experiences.byId),
    );
  }

  static getExperienceDescription(
    id: string,
  ): (state: FormStateModel) => FormExperienceDescription[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.experienceDescriptions.byId).filter(
        (description) => description.experienceId === id,
      ),
    );
  }

  static getSkills(): (state: FormStateModel) => FormSkill[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.skills.byId),
    );
  }

  static getCertifications(): (state: FormStateModel) => FormCertification[] {
    return createSelector([FormState], (state: FormStateModel) =>
      Object.values(state.certifications.byId),
    );
  }

  @Action(Form.InitializeState)
  initializeState(
    ctx: StateContext<FormStateModel>,
    action: Form.InitializeState,
  ) {
    const socials = [
      ...action.resume.byType[SelectorType.SOCIAL_NAME],
      ...action.resume.byType[SelectorType.SOCIAL_ICON],
      ...action.resume.byType[SelectorType.SOCIAL_URL],
    ]
      .map((nodeId) => action.resume.byId[nodeId])
      .sort((a, b) => a.groupPosition - b.groupPosition)
      .reduce(
        (acc, node) => {
          if (!acc[node.groupId]) {
            acc[node.groupId] = {
              id: node.groupId,
              name: '',
              url: '',
            };
          }
          if (SelectorType.SOCIAL_NAME === node.type) {
            acc[node.groupId].name = node.value.toString();
          }
          if (SelectorType.SOCIAL_URL === node.type) {
            acc[node.groupId].url = node.value.toString();
          }
          return acc;
        },
        {} as { [id: string]: FormSocial },
      );

    const experiences = [
      ...action.resume.byType[SelectorType.EXPERIENCE_ORGANIZATION],
      ...action.resume.byType[SelectorType.EXPERIENCE_TITLE],
      ...action.resume.byType[SelectorType.EXPERIENCE_DURATION],
      ...action.resume.byType[SelectorType.EXPERIENCE_LOCATION],
      ...action.resume.byType[SelectorType.EXPERIENCE_DESCRIPTION],
      ...action.resume.byType[SelectorType.EXPERIENCE_SKILL],
    ]
      .map((nodeId) => action.resume.byId[nodeId])
      .sort((a, b) => a.groupPosition - b.groupPosition)
      .reduce(
        (acc, node) => {
          if (!acc[node.groupId]) {
            acc[node.groupId] = {
              id: node.groupId,
              organization: '',
              title: '',
              duration: '',
              location: '',
              rawDescription: '',
              rawSkills: '',
            };
          }
          if (SelectorType.EXPERIENCE_ORGANIZATION === node.type) {
            acc[node.groupId].organization = node.value.toString();
          }
          if (SelectorType.EXPERIENCE_TITLE === node.type) {
            acc[node.groupId].title = node.value.toString();
          }
          if (SelectorType.EXPERIENCE_DURATION === node.type) {
            acc[node.groupId].duration = node.value.toString();
          }
          if (SelectorType.EXPERIENCE_LOCATION === node.type) {
            acc[node.groupId].location = node.value.toString();
          }
          if (SelectorType.EXPERIENCE_DESCRIPTION === node.type) {
            acc[node.groupId].rawDescription = acc[node.groupId].rawDescription
              ? acc[node.groupId].rawDescription.concat(
                  '\n',
                  node.value.toString(),
                )
              : node.value.toString();
          }
          if (SelectorType.EXPERIENCE_SKILL === node.type) {
            acc[node.groupId].rawSkills = acc[node.groupId].rawSkills
              ? acc[node.groupId].rawSkills.concat(', ', node.value.toString())
              : node.value.toString();
          }
          return acc;
        },
        {} as { [id: string]: FormExperience },
      );

    const experienceDescriptions = action.resume.byType[
      SelectorType.EXPERIENCE_DESCRIPTION
    ]
      .map((nodeId) => action.resume.byId[nodeId])
      .reduce(
        (acc, node) => {
          if (!acc[node.id]) {
            acc[node.id] = {
              id: node.id,
              experienceId: node.groupId,
              position: node.position,
              value: node.value.toString(),
            };
          }
          return acc;
        },
        {} as { [id: string]: FormExperienceDescription },
      );

    const experienceSkills = action.resume.byType[SelectorType.EXPERIENCE_SKILL]
      .map((nodeId) => action.resume.byId[nodeId])
      .reduce(
        (acc, node) => {
          if (!acc[node.id]) {
            acc[node.id] = {
              id: node.id,
              experienceId: node.groupId,
              position: node.position,
              value: node.value.toString(),
            };
          }
          return acc;
        },
        {} as { [id: string]: FormExperienceSkill },
      );

    const skills = [
      ...action.resume.byType[SelectorType.SKILL_NAME],
      ...action.resume.byType[SelectorType.SKILL_PROFICIENCY],
    ]
      .map((nodeId) => action.resume.byId[nodeId])
      .sort((a, b) => a.groupPosition - b.groupPosition)
      .reduce(
        (acc, node) => {
          if (!acc[node.groupId]) {
            acc[node.groupId] = {
              id: node.groupId,
              name: '',
              proficiency: 0,
            };
          }
          if (SelectorType.SKILL_NAME === node.type) {
            acc[node.groupId].name = node.value.toString();
          }
          if (SelectorType.SKILL_PROFICIENCY === node.type) {
            acc[node.groupId].proficiency = node.value as number;
          }
          return acc;
        },
        {} as { [id: string]: FormSkill },
      );

    const certifications = [
      ...action.resume.byType[SelectorType.CERTIFICATION_ORGANIZATION],
      ...action.resume.byType[SelectorType.CERTIFICATION_TITLE],
      ...action.resume.byType[SelectorType.CERTIFICATION_YEAR],
      ...action.resume.byType[SelectorType.CERTIFICATION_LOCATION],
    ]
      .map((nodeId) => action.resume.byId[nodeId])
      .sort((a, b) => a.groupPosition - b.groupPosition)
      .reduce(
        (acc, node) => {
          if (!acc[node.groupId]) {
            acc[node.groupId] = {
              id: node.groupId,
              organization: '',
              title: '',
              year: '',
              location: '',
            };
          }
          if (SelectorType.CERTIFICATION_ORGANIZATION === node.type) {
            acc[node.groupId].organization = node.value.toString();
          }
          if (SelectorType.CERTIFICATION_TITLE === node.type) {
            acc[node.groupId].title = node.value.toString();
          }
          if (SelectorType.CERTIFICATION_YEAR === node.type) {
            acc[node.groupId].year = node.value.toString();
          }
          if (SelectorType.CERTIFICATION_LOCATION === node.type) {
            acc[node.groupId].location = node.value.toString();
          }
          return acc;
        },
        {} as { [id: string]: FormCertification },
      );

    const newState = {
      name:
        action.resume.byId[
          action.resume.byType[SelectorType.NAME][0]
        ]?.value.toString() || '',
      title:
        action.resume.byId[
          action.resume.byType[SelectorType.TITLE][0]
        ]?.value.toString() || '',
      summary:
        action.resume.byId[
          action.resume.byType[SelectorType.SUMMARY][0]
        ]?.value.toString() || '',
      phone:
        action.resume.byId[
          action.resume.byType[SelectorType.PHONE][0]
        ]?.value.toString() || '',
      email:
        action.resume.byId[
          action.resume.byType[SelectorType.EMAIL][0]
        ]?.value.toString() || '',
      location:
        action.resume.byId[
          action.resume.byType[SelectorType.LOCATION][0]
        ]?.value.toString() || '',
      socials: {
        byId: socials,
        allIds: Object.keys(socials),
      },
      experiences: {
        byId: experiences,
        allIds: Object.keys(experiences),
      },
      experienceDescriptions: {
        byId: experienceDescriptions,
        allIds: Object.keys(experienceDescriptions),
      },
      experienceSkills: {
        byId: experienceSkills,
        allIds: Object.keys(experienceSkills),
      },
      skills: {
        byId: skills,
        allIds: Object.keys(skills),
      },
      certifications: {
        byId: certifications,
        allIds: Object.keys(certifications),
      },
    };

    ctx.setState({
      ...newState,
    });
  }

  @Action(Form.NameUpdate)
  formNameUpdate(ctx: StateContext<FormStateModel>, action: Form.NameUpdate) {
    ctx.setState({
      ...ctx.getState(),
      name: action.name,
    });
    ctx.dispatch(new Resume.NodeCreateOrUpdate(SelectorType.NAME, action.name));
  }

  @Action(Form.TitleUpdate)
  formTitleUpdate(ctx: StateContext<FormStateModel>, action: Form.TitleUpdate) {
    ctx.setState({
      ...ctx.getState(),
      title: action.title,
    });
    ctx.dispatch(
      new Resume.NodeCreateOrUpdate(SelectorType.TITLE, action.title),
    );
  }

  @Action(Form.SummaryUpdate)
  formSummaryUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.SummaryUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      summary: action.summary,
    });
    ctx.dispatch(
      new Resume.NodeCreateOrUpdate(SelectorType.SUMMARY, action.summary),
    );
  }

  @Action(Form.PhoneUpdate)
  formPhoneUpdate(ctx: StateContext<FormStateModel>, action: Form.PhoneUpdate) {
    ctx.setState({
      ...ctx.getState(),
      phone: action.phone,
    });
    ctx.dispatch(
      new Resume.NodeCreateOrUpdate(SelectorType.PHONE, action.phone),
    );
  }

  @Action(Form.EmailUpdate)
  formEmailUpdate(ctx: StateContext<FormStateModel>, action: Form.EmailUpdate) {
    ctx.setState({
      ...ctx.getState(),
      email: action.email,
    });
    ctx.dispatch(
      new Resume.NodeCreateOrUpdate(SelectorType.EMAIL, action.email),
    );
  }

  @Action(Form.LocationUpdate)
  formLocationUpate(
    ctx: StateContext<FormStateModel>,
    action: Form.LocationUpdate,
  ) {
    ctx.setState({
      ...ctx.getState(),
      location: action.location,
    });
    ctx.dispatch(
      new Resume.NodeCreateOrUpdate(SelectorType.LOCATION, action.location),
    );
  }

  @Action(Form.Social.Create)
  socialCreate(ctx: StateContext<FormStateModel>) {
    const social = { id: this.uuid.rnd(), name: '', url: '', icon: '' };
    const updatedById = { ...ctx.getState().socials.byId, [social.id]: social };
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      socials: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });
  }

  @Action(Form.Social.Delete)
  socialDelete(ctx: StateContext<FormStateModel>, action: Form.Social.Delete) {
    const updatedById = Object.values(ctx.getState().socials.byId)
      .filter((social) => action.id !== social.id)
      .reduce((acc, social) => ({ ...acc, [social.id]: social }), {});
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      socials: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.NodeDeleteByGroupId(action.id));
  }

  @Action(Form.Social.NameUpdate)
  socialNameUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.NameUpdate,
  ) {
    const social = ctx.getState().socials.byId[action.id];
    const updatedSocial = { ...social, name: action.name };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        byId: {
          ...ctx.getState().socials.byId,
          [updatedSocial.id]: updatedSocial,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.SOCIAL_NAME,
        updatedSocial.name,
        updatedSocial.id,
        action.index,
      ),
    );
  }

  @Action(Form.Social.UrlUpdate)
  socialUrlUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Social.UrlUpdate,
  ) {
    const social = ctx.getState().socials.byId[action.id];
    const updatedSocial = { ...social, url: action.url };

    ctx.setState({
      ...ctx.getState(),
      socials: {
        ...ctx.getState().socials,
        byId: {
          ...ctx.getState().socials.byId,
          [updatedSocial.id]: updatedSocial,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.SOCIAL_URL,
        updatedSocial.url,
        updatedSocial.id,
        action.index,
      ),
    );
  }

  @Action(Form.Experience.Create)
  experienceCreate(ctx: StateContext<FormStateModel>) {
    const experiences = ctx.getState().experiences;
    const experience = {
      id: this.uuid.rnd(),
      title: '',
      organization: '',
      duration: '',
      location: '',
      rawDescription: '',
      rawSkills: '',
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        byId: { ...experiences.byId, [experience.id]: experience },
        allIds: [...experiences.allIds, experience.id],
      },
    });
  }

  @Action(Form.Experience.Delete)
  experienceDelete(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.Delete,
  ) {
    const updatedById = Object.values(ctx.getState().experiences.byId)
      .filter((experience) => experience.id !== action.id)
      .reduce(
        (acc, experience) => ({ ...acc, [experience.id]: experience }),
        {},
      );
    const updatedAllIds = Object.keys(updatedById);

    const updatedDescriptionsById = Object.values(
      ctx.getState().experienceDescriptions.byId,
    )
      .filter(
        (experienceDescription) =>
          experienceDescription.experienceId !== action.id,
      )
      .reduce(
        (acc, experienceDescription) => ({
          ...acc,
          [experienceDescription.id]: experienceDescription,
        }),
        {},
      );
    const updatedDescriptionsAllIds = Object.keys(updatedDescriptionsById);

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
      experienceDescriptions: {
        byId: updatedDescriptionsById,
        allIds: updatedDescriptionsAllIds,
      },
    });

    return ctx.dispatch(new Resume.NodeDeleteByGroupId(action.id));
  }

  @Action(Form.Experience.TitleUpdate)
  experienceTitleUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.TitleUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, title: action.title };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.EXPERIENCE_TITLE,
        updatedExperience.title,
        updatedExperience.id,
        action.index,
      ),
    );
  }

  @Action(Form.Experience.OrganizationUpdate)
  experienceOrganizationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.OrganizationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = {
      ...experience,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.EXPERIENCE_ORGANIZATION,
        updatedExperience.organization,
        updatedExperience.id,
        action.index,
      ),
    );
  }

  @Action(Form.Experience.DurationUpdate)
  experienceDurationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DurationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, duration: action.duration };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.EXPERIENCE_DURATION,
        updatedExperience.duration,
        updatedExperience.id,
        action.index,
      ),
    );
  }

  @Action(Form.Experience.LocationUpdate)
  experienceLocationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.LocationUpdate,
  ) {
    const experience = ctx.getState().experiences.byId[action.id];
    const updatedExperience = { ...experience, location: action.location };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [updatedExperience.id]: updatedExperience,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.EXPERIENCE_LOCATION,
        updatedExperience.location,
        updatedExperience.id,
        action.index,
      ),
    );
  }

  @Action(Form.Experience.DescriptionUpdate)
  experienceDescriptionUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.DescriptionUpdate,
  ) {
    const experienceDescriptions = Object.values(
      ctx.getState().experienceDescriptions.byId,
    ).filter((description) => description.experienceId === action.id);

    const prevDescriptions = new Map(
      experienceDescriptions.map((description) => [
        description.position,
        description,
      ]),
    );
    const prevDescriptionIds = experienceDescriptions.map(
      (description) => description.id,
    );

    const newDescriptions: { [id: string]: FormExperienceDescription } =
      action.description
        .split('\n')
        .filter((value) => value.trim())
        .map((value, index) =>
          prevDescriptions.has(index)
            ? { ...prevDescriptions.get(index), value: value }
            : {
                id: this.uuid.rnd(),
                experienceId: action.id,
                position: index,
                value: value,
              },
        )
        .reduce(
          (acc, description) => ({
            ...acc,
            [description.id as string]: description,
          }),
          {},
        );
    const newDescriptionsAllIds = Object.keys(newDescriptions);

    const otherExperienceDescriptions = Object.values(
      ctx.getState().experienceDescriptions.byId,
    )
      .filter((description) => description.experienceId !== action.id)
      .reduce(
        (acc, description) => ({ ...acc, [description.id]: description }),
        {},
      );
    const otherExperienceDescriptionsAllIds = Object.keys(
      otherExperienceDescriptions,
    );

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [action.id]: {
            ...ctx.getState().experiences.byId[action.id],
            rawDescription: action.description,
          },
        },
      },
      experienceDescriptions: {
        byId: {
          ...otherExperienceDescriptions,
          ...newDescriptions,
        },
        allIds: [
          ...otherExperienceDescriptionsAllIds,
          ...newDescriptionsAllIds,
        ],
      },
    });

    const addedDescriptions = newDescriptionsAllIds
      .filter((id) => !prevDescriptionIds.includes(id))
      .map(
        (id) =>
          new Resume.NodeCreateOrUpdate(
            SelectorType.EXPERIENCE_DESCRIPTION,
            newDescriptions[id].value,
            newDescriptions[id].experienceId,
            action.index,
            newDescriptions[id].position,
          ),
      );

    const updatedDescriptions = experienceDescriptions
      .filter((prevDescription) =>
        newDescriptionsAllIds.includes(prevDescription.id),
      )
      .filter(
        (prevDescription) =>
          prevDescription.value !== newDescriptions[prevDescription.id].value ||
          prevDescription.position !==
            newDescriptions[prevDescription.id].position,
      )
      .map(
        (prevDescription) =>
          new Resume.NodeCreateOrUpdate(
            SelectorType.EXPERIENCE_DESCRIPTION,
            newDescriptions[prevDescription.id].value,
            newDescriptions[prevDescription.id].experienceId,
            action.index,
            newDescriptions[prevDescription.id].position,
          ),
      );

    const removedDescriptions = prevDescriptionIds
      .filter((id) => !newDescriptionsAllIds.includes(id))
      .flatMap((id) =>
        experienceDescriptions.filter(
          (prevDescription) => prevDescription.id === id,
        ),
      )
      .map(
        (prevDescription) =>
          new Resume.NodeDeleteByGroupIdAndPosition(
            prevDescription.experienceId,
            SelectorType.EXPERIENCE_DESCRIPTION,
            prevDescription.position,
          ),
      );

    return ctx.dispatch([
      ...removedDescriptions,
      ...updatedDescriptions,
      ...addedDescriptions,
    ]);
  }

  @Action(Form.Experience.SkillsUpdate)
  experienceSkillsUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Experience.SkillsUpdate,
  ) {
    const experienceSkills = Object.values(
      ctx.getState().experienceSkills.byId,
    ).filter((skill) => skill.experienceId === action.id);

    const prevSkills = new Map(
      experienceSkills.map((skill) => [skill.position, skill]),
    );

    const prevSkillIds = experienceSkills.map((skill) => skill.id);

    const newSkills: { [id: string]: FormExperienceSkill } = action.skills
      .split(',')
      .map((value) => value.trim())
      .filter((value) => value)
      .map((value, index) =>
        prevSkills.has(index)
          ? { ...prevSkills.get(index), value: value }
          : {
              id: this.uuid.rnd(),
              experienceId: action.id,
              position: index,
              value: value,
            },
      )
      .reduce((acc, skill) => ({ ...acc, [skill.id as string]: skill }), {});

    const newSkillIds = Object.keys(newSkills);

    const otherExperienceSkills = Object.values(
      ctx.getState().experienceSkills.byId,
    )
      .filter((skill) => skill.experienceId !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});

    const otherExperienceSkillIds = Object.keys(otherExperienceSkills);

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        byId: {
          ...ctx.getState().experiences.byId,
          [action.id]: {
            ...ctx.getState().experiences.byId[action.id],
            rawSkills: action.skills,
          },
        },
      },
      experienceSkills: {
        byId: {
          ...otherExperienceSkills,
          ...newSkills,
        },
        allIds: [...otherExperienceSkillIds, ...newSkillIds],
      },
    });

    const addedSkills = newSkillIds
      .filter((id) => !prevSkillIds.includes(id))
      .map(
        (id) =>
          new Resume.NodeCreateOrUpdate(
            SelectorType.EXPERIENCE_SKILL,
            newSkills[id].value,
            newSkills[id].experienceId,
            action.index,
            newSkills[id].position,
          ),
      );

    const updatedSkills = experienceSkills
      .filter((prevSkill) => newSkillIds.includes(prevSkill.id))
      .filter(
        (prevSkill) =>
          prevSkill.value !== newSkills[prevSkill.id].value ||
          prevSkill.position !== newSkills[prevSkill.id].position,
      )
      .map(
        (prevSkill) =>
          new Resume.NodeCreateOrUpdate(
            SelectorType.EXPERIENCE_SKILL,
            newSkills[prevSkill.id].value,
            newSkills[prevSkill.id].experienceId,
            action.index,
            newSkills[prevSkill.id].position,
          ),
      );

    const removedSkills = prevSkillIds
      .filter((id) => !newSkillIds.includes(id))
      .flatMap((id) =>
        experienceSkills.filter((prevSkill) => prevSkill.id === id),
      )
      .map(
        (prevSkill) =>
          new Resume.NodeDeleteByGroupIdAndPosition(
            prevSkill.experienceId,
            SelectorType.EXPERIENCE_SKILL,
            prevSkill.position,
          ),
      );

    return ctx.dispatch([...removedSkills, ...updatedSkills, ...addedSkills]);
  }

  @Action(Form.Skill.Create)
  skillCreate(ctx: StateContext<FormStateModel>) {
    const skills = ctx.getState().skills;
    const skill = {
      id: this.uuid.rnd(),
      name: '',
      proficiency: 0,
    };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        byId: { ...skills.byId, [skill.id]: skill },
        allIds: [...skills.allIds, skill.id],
      },
    });
  }

  @Action(Form.Skill.Delete)
  skillDelete(ctx: StateContext<FormStateModel>, action: Form.Skill.Delete) {
    const updatedById = Object.values(ctx.getState().skills.byId)
      .filter((skill) => skill.id !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      skills: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.NodeDeleteByGroupId(action.id));
  }

  @Action(Form.Skill.NameUpdate)
  skillNameUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Skill.NameUpdate,
  ) {
    const skill = ctx.getState().skills.byId[action.id];
    const updatedSkill = { ...skill, name: action.name };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        byId: {
          ...ctx.getState().skills.byId,
          [updatedSkill.id]: updatedSkill,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.SKILL_NAME,
        updatedSkill.name,
        updatedSkill.id,
      ),
    );
  }

  @Action(Form.Skill.ProficiencyUpdate)
  skillProficiencyUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Skill.ProficiencyUpdate,
  ) {
    const skill = ctx.getState().skills.byId[action.id];
    const updatedSkill = { ...skill, proficiency: action.proficiency };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        byId: {
          ...ctx.getState().skills.byId,
          [updatedSkill.id]: updatedSkill,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.SKILL_PROFICIENCY,
        updatedSkill.proficiency,
        updatedSkill.id,
      ),
    );
  }

  @Action(Form.Certification.Create)
  certificationCreate(ctx: StateContext<FormStateModel>) {
    const certifications = ctx.getState().certifications;
    const certification = {
      id: this.uuid.rnd(),
      title: '',
      organization: '',
      year: '',
      location: '',
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        byId: {
          ...certifications.byId,
          [certification.id]: certification,
        },
        allIds: [...certifications.allIds, certification.id],
      },
    });
  }

  @Action(Form.Certification.Delete)
  certificationDelete(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.Delete,
  ) {
    const updatedById = Object.values(ctx.getState().certifications.byId)
      .filter((certification) => certification.id !== action.id)
      .reduce(
        (acc, certification) => ({ ...acc, [certification.id]: certification }),
        {},
      );
    const updatedAllIds = Object.keys(updatedById);

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        byId: updatedById,
        allIds: updatedAllIds,
      },
    });

    return ctx.dispatch(new Resume.NodeDeleteByGroupId(action.id));
  }

  @Action(Form.Certification.TitleUpdate)
  certificationTitleUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.TitleUpdate,
  ) {
    const certification = ctx.getState().certifications.byId[action.id];
    const updatedCertification = { ...certification, title: action.title };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        byId: {
          ...ctx.getState().certifications.byId,
          [updatedCertification.id]: updatedCertification,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.CERTIFICATION_TITLE,
        updatedCertification.title,
        updatedCertification.id,
      ),
    );
  }

  @Action(Form.Certification.OrganizationUpdate)
  certificationOrganizationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.OrganizationUpdate,
  ) {
    const certification = ctx.getState().certifications.byId[action.id];
    const updatedCertification = {
      ...certification,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        byId: {
          ...ctx.getState().certifications.byId,
          [updatedCertification.id]: updatedCertification,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.CERTIFICATION_ORGANIZATION,
        updatedCertification.organization,
        updatedCertification.id,
      ),
    );
  }

  @Action(Form.Certification.YearUpdate)
  certificationYearUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.YearUpdate,
  ) {
    const certification = ctx.getState().certifications.byId[action.id];
    const updatedCertification = { ...certification, year: action.year };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        byId: {
          ...ctx.getState().certifications.byId,
          [updatedCertification.id]: updatedCertification,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.CERTIFICATION_YEAR,
        updatedCertification.year,
        updatedCertification.id,
      ),
    );
  }

  @Action(Form.Certification.LocationUpdate)
  certificationLocationUpdate(
    ctx: StateContext<FormStateModel>,
    action: Form.Certification.LocationUpdate,
  ) {
    const certification = ctx.getState().certifications.byId[action.id];
    const updatedCertification = {
      ...certification,
      location: action.location,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        byId: {
          ...ctx.getState().certifications.byId,
          [updatedCertification.id]: updatedCertification,
        },
      },
    });

    return ctx.dispatch(
      new Resume.NodeCreateOrUpdate(
        SelectorType.CERTIFICATION_LOCATION,
        updatedCertification.location,
        updatedCertification.id,
      ),
    );
  }
}
