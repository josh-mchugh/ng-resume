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
      case SelectorType.SKILL_PROFICIENCY:
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
        ...state.byType[SelectorType.EXPERIENCE_TITLE],
        ...state.byType[SelectorType.EXPERIENCE_DURATION],
        ...state.byType[SelectorType.EXPERIENCE_LOCATION],
        ...state.byType[SelectorType.EXPERIENCE_DESCRIPTION],
        ...state.byType[SelectorType.EXPERIENCE_SKILL],
      ].map((id) => state.byId[id].groupId);
      return [...new Set<string>(groupIds)];
    });
  }

  private static selectorExperienceTitle(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.EXPERIENCE_TITLE]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorExperienceDuration(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.EXPERIENCE_DURATION]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
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
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.EXPERIENCE_LOCATION]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorExperienceDescriptionList(groupId: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const ids = state.byType[SelectorType.EXPERIENCE_DESCRIPTION]
        .map((id) => state.byId[id])
        .filter((node) => node.groupId === groupId)
        .sort((a, b) => a.position - b.position)
        .map((node) => node.id);
      return [...new Set<string>(ids)];
    });
  }

  private static selectorExperienceDescription(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.byId[id].value,
    );
  }

  private static selectorExperienceSkillList(groupId: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const ids = state.byType[SelectorType.EXPERIENCE_SKILL]
        .map((id) => state.byId[id])
        .filter((node) => node.groupId === groupId)
        .sort((a, b) => a.position - b.position)
        .map((node) => node.id);
      return [...new Set<string>(ids)];
    });
  }

  private static selectorExperienceSkill(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.byId[id].value,
    );
  }

  private static selectorSkillList() {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const groupIds = [
        ...state.byType[SelectorType.SKILL_NAME],
        ...state.byType[SelectorType.SKILL_PROFICIENCY],
      ].map((id) => state.byId[id].groupId);
      return [...new Set<string>(groupIds)];
    });
  }

  private static selectorSkillName(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.SKILL_NAME]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return nodes[0].value;
    });
  }

  private static selectorSkillBlocks(id: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[SelectorType.SKILL_PROFICIENCY]
        .filter((nodeId) => state.byId[nodeId].groupId === id)
        .map((nodeId) => state.byId[nodeId]);
      return [...Array(5).keys()].map((value) => {
        return {
          active: (nodes[0].value as number) >= value + 1,
        };
      });
    });
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
    const nodes = ctx
      .getState()
      .byType[action.type].filter(
        (id) => ctx.getState().byId[id].groupId === action.groupId,
      )
      .map((id) => ctx.getState().byId[id])
      .sort((a, b) => a.position - b.position);
    const node =
      nodes.length && nodes[action.position]
        ? {
            ...nodes[action.position],
            value: action.value,
          }
        : {
            id: this.uuid.rnd(),
            groupId: action.groupId,
            groupPosition: action.groupPosition,
            type: action.type,
            position: action.position,
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
      !this.displayService.hasSectionByResumeId(node.id, node.type)
    ) {
      return ctx.dispatch(new Display.SectionCreate(node.id, node.type));
    } else {
      return;
    }
  }

  @Action(Resume.NodeDeleteByGroupId)
  nodeDeletByGroupId(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.NodeDeleteByGroupId,
  ) {
    const nodes = Object.values(ctx.getState().byId);

    const removedNodes = nodes
      .filter((node) => node.groupId === action.groupId)
      .reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    const removeIds = Object.keys(removedNodes);

    const updatedById = nodes
      .filter((node) => !removeIds.includes(node.id))
      .reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    const updatedByType = nodes
      .filter((node) => !removeIds.includes(node.id))
      .reduce(
        (acc, node) => {
          if (!acc[node.type]) {
            acc[node.type] = [];
          }
          acc[node.type].push(node.id);
          return acc;
        },
        {} as { [id: string]: string[] },
      );

    ctx.setState({
      ...ctx.getState(),
      byId: updatedById,
      allIds: ctx.getState().allIds.filter((id) => removeIds.includes(id)),
      byType: updatedByType,
    });

    return ctx.dispatch([
      ...removeIds.map((id) => new Display.SectionDelete(id)),
      new Display.SectionDelete(action.groupId),
    ]);
  }

  @Action(Resume.NodeDeleteByGroupIdAndPosition)
  nodeDeleteByGroupIdAndPosition(
    ctx: StateContext<ResumeStateModel>,
    action: Resume.NodeDeleteByGroupIdAndPosition,
  ) {
    const nodes = Object.values(ctx.getState().byId);

    const removeNodes = nodes
      .filter(
        (node) =>
          node.groupId === action.groupId &&
          node.type === action.type &&
          node.position === action.position,
      )
      .reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    const removeIds = Object.keys(removeNodes);

    const updatedById = nodes
      .filter((node) => !removeIds.includes(node.id))
      .reduce((acc, node) => ({ ...acc, [node.id]: node }), {});

    const updatedByType = nodes
      .filter((node) => !removeIds.includes(node.id))
      .reduce(
        (acc, node) => {
          if (!acc[node.type]) {
            acc[node.type] = [];
          }
          acc[node.type].push(node.id);
          return acc;
        },
        {} as { [id: string]: string[] },
      );

    ctx.setState({
      ...ctx.getState(),
      byId: updatedById,
      allIds: ctx.getState().allIds.filter((id) => removeIds.includes(id)),
      byType: updatedByType,
    });

    return ctx.dispatch([
      ...removeIds.map((id) => new Display.SectionDelete(id)),
    ]);
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
