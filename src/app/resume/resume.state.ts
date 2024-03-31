import { Injectable } from '@angular/core';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';
import { Display } from '@display/display.actions';
import { DisplayService } from '@display/display.service';
import { ResumeStateConfig } from '@resume/resume.config';
import { SelectorType } from '@resume/selector-type.enum';
import ShortUniqueId from 'short-unique-id';

export interface ResumeStateModel {
  byId: { [id: string]: ResumeNode };
  allIds: string[];
  byType: { [type: string]: string[] };
  experiences: { [id: string]: Experience };
  experienceDescriptions: { [id: string]: ExperienceDescription };
  experienceSkills: { [id: string]: ExperienceSkill };
  skills: { [id: string]: Skill };
  certifications: { [id: string]: Certification };
}

export interface ResumeNode {
  id: string;
  groupId: string;
  groupPosition: number;
  type: SelectorType;
  position: number;
  value: string | number;
}

export interface Social {
  id: string;
  icon: string;
  name: string;
  url: string;
}

export interface Experience {
  id: string;
  title: string;
  organization: string;
  duration: string;
  location: string;
}

export interface ExperienceDescription {
  id: string;
  experienceId: string;
  position: number;
  value: string;
}

export interface ExperienceSkill {
  id: string;
  experienceId: string;
  position: number;
  value: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: number;
}

export interface Certification {
  id: string;
  title: string;
  organization: string;
  year: string;
  location: string;
}

@State<ResumeStateModel>({
  name: 'resume',
  defaults: ResumeStateConfig.DEFAULT,
})
@Injectable()
export class ResumeState {
  private uuid: ShortUniqueId;

  constructor(private displayService: DisplayService) {
    this.uuid = new ShortUniqueId();
  }

  static hasContent(): (state: ResumeStateModel) => boolean {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) =>
        JSON.stringify(state) !== JSON.stringify(ResumeStateConfig.DEFAULT),
    );
  }

  // Ignore until refactoring out generic type any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static selectorValue(selectorType: SelectorType, id: string): any {
    switch (selectorType) {
      case SelectorType.NAME:
        return this.selectorName();
      case SelectorType.TITLE:
        return this.selectorTitle();
      case SelectorType.SUMMARY:
        return this.selectorSummary();
      case SelectorType.EMAIL:
        return this.selectorEmail();
      case SelectorType.LOCATION:
        return this.selectorLocation();
      case SelectorType.PHONE:
        return this.selectorPhone();
      case SelectorType.SOCIAL_LIST:
        return this.selectorSocialList();
      case SelectorType.SOCIAL_ICON:
        return this.selectorSocialIcon(id);
      case SelectorType.SOCIAL_NAME:
        return this.selectorSocialName(id);
      case SelectorType.SOCIAL_URL:
        return this.selectorSocialUrl(id);
      case SelectorType.EXPERIENCE_LIST:
        return this.selectorExperienceList();
      case SelectorType.EXPERIENCE_TITLE:
        return this.selectorExperienceTitle(id);
      case SelectorType.EXPERIENCE_DURATION:
        return this.selectorExperienceDuration(id);
      case SelectorType.EXPERIENCE_ORGANIZATION:
        return this.selectorExperienceOrganization(id);
      case SelectorType.EXPERIENCE_LOCATION:
        return this.selectorExperienceLocation(id);
      case SelectorType.EXPERIENCE_DESCRIPTION_LIST:
        return this.selectorExperienceDescriptionList(id);
      case SelectorType.EXPERIENCE_DESCRIPTION:
        return this.selectorExperienceDescription(id);
      case SelectorType.EXPERIENCE_SKILL_LIST:
        return this.selectorExperienceSkillList(id);
      case SelectorType.EXPERIENCE_SKILL:
        return this.selectorExperienceSkill(id);
      case SelectorType.SKILL_LIST:
        return this.selectorSkillList();
      case SelectorType.SKILL_NAME:
        return this.selectorSkillName(id);
      case SelectorType.SKILL_BLOCKS:
        return this.selectorSkillBlocks(id);
      case SelectorType.CERTIFICATION_LIST:
        return this.selectorCertificationList();
      case SelectorType.CERTIFICATION_TITLE:
        return this.selectorCertificationTitle(id);
      case SelectorType.CERTIFICATION_YEAR:
        return this.selectorCertificationYear(id);
      case SelectorType.CERTIFICATION_ORGANIZATION:
        return this.selectorCertificationOrganization(id);
      case SelectorType.CERTIFICATION_LOCATION:
        return this.selectorCertificationLocation(id);
      default:
        throw new Error('Unknow selector type: ' + selectorType);
    }
  }

  private static selectorName() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.NAME][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorTitle() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.TITLE][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorSummary() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.SUMMARY][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorEmail() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.EMAIL][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorLocation() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.LOCATION][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorPhone() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[SelectorType.PHONE][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static selectorSocialList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const groupIds = [
        ...state.byType[SelectorType.SOCIAL_NAME],
        ...state.byType[SelectorType.SOCIAL_ICON],
        ...state.byType[SelectorType.SOCIAL_URL],
      ].map((id) => state.byId[id].groupId);
      return [...new Set<string>(groupIds)];
    });
  }

  private static selectorSocialIcon(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.SOCIAL_ICON]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorSocialName(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.SOCIAL_NAME]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorSocialUrl(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.SOCIAL_URL]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorExperienceList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const groupIds = [
        ...state.byType[SelectorType.EXPERIENCE_ORGANIZATION],
        //...state.byType[SelectorType.EXPERIENCE_TITLE],
        //...state.byType[SelectorType.EXPERIENCE_DURATION],
        //...state.byType[SelectorType.EXPERIENCE_LOCATION],
        //...state.byType[SelectorType.EXPERIENCE_DESCRIPTION],
        //...state.byType[SelectorType.EXPERIENCE_SKILL],
      ].map((id) => state.byId[id].groupId);
      return [...new Set<string>(groupIds)];
    });
  }

  private static selectorExperienceTitle(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].title,
    );
  }

  private static selectorExperienceDuration(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].duration,
    );
  }

  private static selectorExperienceOrganization(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.EXPERIENCE_ORGANIZATION]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorExperienceLocation(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experiences[id].location,
    );
  }

  private static selectorExperienceDescriptionList(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.values(state.experienceDescriptions)
        .filter((description) => id === description.experienceId)
        .map((description) => description.id),
    );
  }

  private static selectorExperienceDescription(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experienceDescriptions[id].value,
    );
  }

  private static selectorExperienceSkillList(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.values(state.experienceSkills)
        .filter((skill) => id === skill.experienceId)
        .map((skill) => skill.id),
    );
  }

  private static selectorExperienceSkill(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.experienceSkills[id].value,
    );
  }

  private static selectorSkillList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.skills),
    );
  }

  private static selectorSkillName(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.skills[id].name,
    );
  }

  private static selectorSkillBlocks(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      [...Array(5).keys()].map((value) => {
        return {
          active: state.skills[id].proficiency >= value + 1,
        };
      }),
    );
  }

  private static selectorCertificationList() {
    return createSelector([ResumeState], (state: ResumeStateModel) =>
      Object.keys(state.certifications),
    );
  }

  private static selectorCertificationTitle(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].title,
    );
  }

  private static selectorCertificationYear(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].year,
    );
  }

  private static selectorCertificationOrganization(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].organization,
    );
  }

  private static selectorCertificationLocation(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.certifications[id].location,
    );
  }

  @Action(Resume.InitializeState)
  setResume(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.InitializeState,
  ) {
    ctx.setState({ ...action.resume });
  }

  @Action(Resume.NodeCreateOrUpdate)
  nameUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.NodeCreateOrUpdate,
  ) {
    const ids = ctx
      .getState()
      .byType[action.type].filter(
        (id) => ctx.getState().byId[id].groupId === action.groupId,
      );
    const node = ids.length
      ? {
          ...ctx.getState().byId[ids[0]],
          value: action.value,
        }
      : {
          id: this.uuid.rnd(),
          groupId: action.groupId,
          groupPosition: action.groupPosition,
          type: action.type,
          position: 0,
          value: action.value,
        };
    ctx.setState({
      ...ctx.getState(),
      byId: {
        ...ctx.getState().byId,
        [node.id]: node,
      },
      allIds: [...new Set([...ctx.getState().allIds, node.id])],
      byType: {
        ...ctx.getState().byType,
        [action.type]: [
          ...new Set([...ctx.getState().byType[action.type], node.id]),
        ],
      },
    });

    if (
      action.groupId &&
      !this.displayService.hasSectionByResumeId(node.groupId, node.type)
    ) {
      return ctx.dispatch(new Display.SectionCreate(node.groupId, node.type));
    } else {
      return;
    }
  }

  @Action(Resume.SocialDelete)
  socialDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SocialDelete,
  ) {
    const removedIds = new Set<string>();
    const updatedNodes = Object.values(ctx.getState().byId)
      .filter((node) => {
        if (action.id !== node.groupId) {
          removedIds.add(node.id);
          return true;
        }
        return false;
      })
      .reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    ctx.setState({
      ...ctx.getState(),
      byId: updatedNodes,
      allIds: ctx.getState().allIds.filter((id) => removedIds.has(id)),
      byType: {
        ...ctx.getState().byType,
        [SelectorType.SOCIAL_NAME]: ctx
          .getState()
          .byType[SelectorType.SOCIAL_NAME].filter((id) => removedIds.has(id)),
        [SelectorType.SOCIAL_ICON]: ctx
          .getState()
          .byType[SelectorType.SOCIAL_ICON].filter((id) => removedIds.has(id)),
        [SelectorType.SOCIAL_URL]: ctx
          .getState()
          .byType[SelectorType.SOCIAL_URL].filter((id) => removedIds.has(id)),
      },
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.ExperienceCreate)
  experienceCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceCreate,
  ) {
    const experience = {
      id: action.id,
      title: '',
      organization: '',
      duration: '',
      location: '',
    };
    const updatedExperiences = {
      ...ctx.getState().experiences,
      [experience.id]: experience,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: updatedExperiences,
    });
  }

  @Action(Resume.ExperienceDelete)
  experienceDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDelete,
  ) {
    const updatedExperiences = Object.values(ctx.getState().experiences)
      .filter((experience) => experience.id !== action.id)
      .reduce(
        (acc, experience) => ({ ...acc, [experience.id]: experience }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      experiences: updatedExperiences,
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.ExperienceTitleUpdate)
  experienceTitleUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceTitleUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      title: action.title,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedExperience.id,
        SelectorType.EXPERIENCE_TITLE,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedExperience.id,
          SelectorType.EXPERIENCE_TITLE,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.ExperienceOrganizationUpdate)
  experienceOrganizationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceOrganizationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedExperience.id,
        SelectorType.EXPERIENCE_ORGANIZATION,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedExperience.id,
          SelectorType.EXPERIENCE_ORGANIZATION,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.ExperienceDurationUpdate)
  experienceDurationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDurationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      duration: action.duration,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedExperience.id,
        SelectorType.EXPERIENCE_DURATION,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedExperience.id,
          SelectorType.EXPERIENCE_DURATION,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.ExperienceLocationUpdate)
  experienceLocationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceLocationUpdate,
  ) {
    const experience = ctx.getState().experiences[action.id];
    const updatedExperience = {
      ...experience,
      location: action.location,
    };

    ctx.setState({
      ...ctx.getState(),
      experiences: {
        ...ctx.getState().experiences,
        [updatedExperience.id]: updatedExperience,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedExperience.id,
        SelectorType.EXPERIENCE_LOCATION,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedExperience.id,
          SelectorType.EXPERIENCE_LOCATION,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.ExperienceDescriptionCreate)
  experienceDescriptionCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDescriptionCreate,
  ) {
    const experienceDescription = {
      id: action.id,
      experienceId: action.experienceId,
      position: action.position,
      value: action.value,
    };

    ctx.setState({
      ...ctx.getState(),
      experienceDescriptions: {
        ...ctx.getState().experienceDescriptions,
        [experienceDescription.id]: experienceDescription,
      },
    });

    if (
      this.displayService.hasSectionByResumeId(
        experienceDescription.experienceId,
        SelectorType.EXPERIENCE_DESCRIPTION_LIST,
      )
    ) {
      return ctx.dispatch([
        new Display.NestedSectionCreate(
          experienceDescription.id,
          experienceDescription.experienceId,
          SelectorType.EXPERIENCE_DESCRIPTION,
        ),
      ]);
    } else {
      return ctx.dispatch([
        new Display.SectionCreate(
          experienceDescription.experienceId,
          SelectorType.EXPERIENCE_DESCRIPTION_LIST,
        ),
        new Display.NestedSectionCreate(
          experienceDescription.id,
          experienceDescription.experienceId,
          SelectorType.EXPERIENCE_DESCRIPTION,
        ),
      ]);
    }
  }

  @Action(Resume.ExperienceDescriptionUpdate)
  experienceDescriptionUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDescriptionUpdate,
  ) {
    const experienceDescription =
      ctx.getState().experienceDescriptions[action.id];
    const updatedExperienceDescription = {
      ...experienceDescription,
      position: action.position,
      value: action.value,
    };

    ctx.setState({
      ...ctx.getState(),
      experienceDescriptions: {
        ...ctx.getState().experienceDescriptions,
        [updatedExperienceDescription.id]: updatedExperienceDescription,
      },
    });
  }

  @Action(Resume.ExperienceDescriptionDelete)
  experienceDescriptionDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceDescriptionDelete,
  ) {
    const updatedExperienceDescriptions = Object.values(
      ctx.getState().experienceDescriptions,
    )
      .filter((description) => description.id !== action.id)
      .reduce(
        (acc, description) => ({ ...acc, [description.id]: description }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      experienceDescriptions: updatedExperienceDescriptions,
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.ExperienceSkillCreate)
  experienceSkillCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceSkillCreate,
  ) {
    const experienceSkill = {
      id: action.id,
      experienceId: action.experienceId,
      position: action.position,
      value: action.value,
    };

    ctx.setState({
      ...ctx.getState(),
      experienceSkills: {
        ...ctx.getState().experienceSkills,
        [experienceSkill.id]: experienceSkill,
      },
    });

    if (
      this.displayService.hasSectionByResumeId(
        experienceSkill.experienceId,
        SelectorType.EXPERIENCE_SKILL_LIST,
      )
    ) {
      return ctx.dispatch(
        new Display.NestedSectionCreate(
          experienceSkill.id,
          experienceSkill.experienceId,
          SelectorType.EXPERIENCE_SKILL,
        ),
      );
    } else {
      return ctx.dispatch([
        new Display.SectionCreate(
          experienceSkill.experienceId,
          SelectorType.EXPERIENCE_SKILL_LIST,
        ),
        new Display.NestedSectionCreate(
          experienceSkill.id,
          experienceSkill.experienceId,
          SelectorType.EXPERIENCE_SKILL,
        ),
      ]);
    }
  }

  @Action(Resume.ExperienceSkillUpdate)
  experienceSkillUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceSkillUpdate,
  ) {
    const experienceSkill = ctx.getState().experienceSkills[action.id];
    const updatedExperienceSkill = {
      ...experienceSkill,
      position: action.position,
      value: action.value,
    };

    ctx.setState({
      ...ctx.getState(),
      experienceSkills: {
        ...ctx.getState().experienceSkills,
        [updatedExperienceSkill.id]: updatedExperienceSkill,
      },
    });
  }

  @Action(Resume.ExperienceSkillDelete)
  experienceSkillDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.ExperienceSkillDelete,
  ) {
    const updatedExperienceSkills = Object.values(
      ctx.getState().experienceSkills,
    )
      .filter((skill) => skill.id !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});

    ctx.setState({
      ...ctx.getState(),
      experienceSkills: updatedExperienceSkills,
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.SkillCreate)
  skillCreate(ctx: StateContext<ResumeStateModel>, action: Resume.SkillCreate) {
    const skill = { id: action.id, name: '', proficiency: 0 };
    const updatedSkills = {
      ...ctx.getState().skills,
      [skill.id]: skill,
    };

    ctx.setState({
      ...ctx.getState(),
      skills: updatedSkills,
    });
  }

  @Action(Resume.SkillDelete)
  skillDelete(ctx: StateContext<ResumeStateModel>, action: Resume.SkillDelete) {
    const updatedSkills = Object.values(ctx.getState().skills)
      .filter((skill) => skill.id !== action.id)
      .reduce((acc, skill) => ({ ...acc, [skill.id]: skill }), {});

    ctx.setState({
      ...ctx.getState(),
      skills: updatedSkills,
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.SkillNameUpdate)
  skillNameUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillNameUpdate,
  ) {
    const skill = ctx.getState().skills[action.id];
    const updatedSkill = { ...skill, name: action.name };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        [updatedSkill.id]: updatedSkill,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedSkill.id,
        SelectorType.SKILL_NAME,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(updatedSkill.id, SelectorType.SKILL_NAME),
      );
    } else {
      return;
    }
  }

  @Action(Resume.SkillProficiencyUpdate)
  skillProficiencyUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.SkillProficiencyUpdate,
  ) {
    const skill = ctx.getState().skills[action.id];
    const updatedSkill = { ...skill, proficiency: action.proficiency };

    ctx.setState({
      ...ctx.getState(),
      skills: {
        ...ctx.getState().skills,
        [updatedSkill.id]: updatedSkill,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedSkill.id,
        SelectorType.SKILL_BLOCKS,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(updatedSkill.id, SelectorType.SKILL_BLOCKS),
      );
    } else {
      return;
    }
  }

  @Action(Resume.CertificationCreate)
  certificationCreate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationCreate,
  ) {
    const certification = {
      id: action.id,
      title: '',
      organization: '',
      year: '',
      location: '',
    };
    const updatedCertifications = {
      ...ctx.getState().certifications,
      [certification.id]: certification,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: updatedCertifications,
    });
  }

  @Action(Resume.CertificationDelete)
  certificationDelete(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationDelete,
  ) {
    const updatedCertifications = Object.values(ctx.getState().certifications)
      .filter((certification) => certification.id !== action.id)
      .reduce(
        (acc, certification) => ({ ...acc, [certification.id]: certification }),
        {},
      );

    ctx.setState({
      ...ctx.getState(),
      certifications: updatedCertifications,
    });

    return ctx.dispatch(new Display.SectionDelete(action.id));
  }

  @Action(Resume.CertificationTitleUpdate)
  certificationTitleUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationTitleUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = { ...certification, title: action.title };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedCertification.id,
        SelectorType.CERTIFICATION_TITLE,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedCertification.id,
          SelectorType.CERTIFICATION_TITLE,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.CertificationOrganizationUpdate)
  certificationOrganizationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationOrganizationUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = {
      ...certification,
      organization: action.organization,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedCertification.id,
        SelectorType.CERTIFICATION_ORGANIZATION,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedCertification.id,
          SelectorType.CERTIFICATION_ORGANIZATION,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.CertificationYearUpdate)
  certificationYearUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationYearUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = {
      ...certification,
      year: action.year,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedCertification.id,
        SelectorType.CERTIFICATION_YEAR,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedCertification.id,
          SelectorType.CERTIFICATION_YEAR,
        ),
      );
    } else {
      return;
    }
  }

  @Action(Resume.CertificationLocationUpdate)
  certificationLocationUpdate(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.CertificationLocationUpdate,
  ) {
    const certification = ctx.getState().certifications[action.id];
    const updatedCertification = {
      ...certification,
      location: action.location,
    };

    ctx.setState({
      ...ctx.getState(),
      certifications: {
        ...ctx.getState().certifications,
        [updatedCertification.id]: updatedCertification,
      },
    });

    if (
      !this.displayService.hasSectionByResumeId(
        updatedCertification.id,
        SelectorType.CERTIFICATION_LOCATION,
      )
    ) {
      return ctx.dispatch(
        new Display.SectionCreate(
          updatedCertification.id,
          SelectorType.CERTIFICATION_LOCATION,
        ),
      );
    } else {
      return;
    }
  }
}
