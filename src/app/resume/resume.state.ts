import { Injectable } from '@angular/core';
import { State, Action, StateContext, createSelector } from '@ngxs/store';
import { Resume } from './resume.actions';
import { Display } from '@display/display.actions';
import { DisplayService } from '@display/display.service';
import { ResumeStateConfig } from '@resume/resume.config';
import { SelectorType, selectorTypesByListType } from '@resume/selector-type.enum';
import ShortUniqueId from 'short-unique-id';

export interface ResumeStateModel {
  byId: { [id: string]: ResumeNode };
  allIds: string[];
  byType: { [type: string]: string[] };
}

export interface ResumeNode {
  id: string;
  groupId: string;
  groupPosition: number;
  type: SelectorType;
  position: number;
  value: string | number;
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
  static selectorValue(type: SelectorType, id: string): any {
    switch (type) {
      case SelectorType.NAME:
        return this.valueByType(type);
      case SelectorType.TITLE:
        return this.valueByType(type);
      case SelectorType.SUMMARY:
        return this.valueByType(type);
      case SelectorType.EMAIL:
        return this.valueByType(type);
      case SelectorType.LOCATION:
        return this.valueByType(type);
      case SelectorType.PHONE:
        return this.valueByType(type);
      case SelectorType.SOCIAL_LIST:
        return this.groupIdsByListType(type);
      case SelectorType.SOCIAL_ICON:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.SOCIAL_NAME:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.SOCIAL_URL:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.EXPERIENCE_LIST:
        return this.groupIdsByListType(type);
      case SelectorType.EXPERIENCE_TITLE:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.EXPERIENCE_DURATION:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.EXPERIENCE_ORGANIZATION:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.EXPERIENCE_LOCATION:
        return this.valueByTypeAndGroupId(type, id)
      case SelectorType.EXPERIENCE_DESCRIPTION_LIST:
        return this.idsByTypeAndGroupId(SelectorType.EXPERIENCE_DESCRIPTION, id);
      case SelectorType.EXPERIENCE_DESCRIPTION:
        return this.valueById(id);
      case SelectorType.EXPERIENCE_SKILL_LIST:
        return this.idsByTypeAndGroupId(SelectorType.EXPERIENCE_SKILL, id);
      case SelectorType.EXPERIENCE_SKILL:
        return this.valueById(id);
      case SelectorType.SKILL_LIST:
        return this.groupIdsByListType(type);
      case SelectorType.SKILL_NAME:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.SKILL_PROFICIENCY:
        return this.selectorSkillBlocks(id);
      case SelectorType.CERTIFICATION_LIST:
        return this.groupIdsByListType(type);
      case SelectorType.CERTIFICATION_TITLE:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.CERTIFICATION_YEAR:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.CERTIFICATION_ORGANIZATION:
        return this.valueByTypeAndGroupId(type, id);
      case SelectorType.CERTIFICATION_LOCATION:
        return this.valueByTypeAndGroupId(type, id);
      default:
        throw new Error('Unknow selector type: ' + type);
    }
  }

  private static valueById(id: string) {
    return createSelector(
      [ResumeState],
      (state: ResumeStateModel) => state.byId[id].value,
    );
  }

  private static valueByType(type: SelectorType) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const id = state.byType[type][0];
      return id ? state.byId[id].value : '';
    });
  }

  private static valueByTypeAndGroupId(type: SelectorType, groupId: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const nodes = state.byType[type]
        .map((nodeId) => state.byId[nodeId])
        .filter((node) => node.groupId === groupId);
      return nodes[0].value;
    });
  }

  private static idsByTypeAndGroupId(type: SelectorType, groupId: string) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const ids = state.byType[type]
        .map((id) => state.byId[id])
        .filter((node) => node.groupId === groupId)
        .sort((a, b) => a.position - b.position)
        .map((node) => node.id);
      return [...new Set<string>(ids)];
    });
  }

  private static groupIdsByListType(type: SelectorType) {
    return createSelector([ResumeState], (state: ResumeStateModel) => {
      const groupIds = selectorTypesByListType(type)
        .flatMap((type) => state.byType[type])
        .map((id) => state.byId[id].groupId);
      return [...new Set<string>(groupIds)];
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
      !this.displayService.hasSectionByResumeGroupId(node.groupId, node.type)
    ) {
      return ctx.dispatch(new Display.SectionCreate(node.groupId, node.type));
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
}
