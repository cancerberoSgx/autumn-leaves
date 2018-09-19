import { Action } from 'redux'
import { Events } from '../state/IGameFramework'
import { Game } from '../state/game'
import { State } from '../state/state'
import { IState, IUnit, IPlayerStateAddUnitButtonState, IBox } from '../state/state-interfaces'
import { newUnit } from '../util/util'
import { StateAccessHelper } from '../state/access/StateAccessHelper'
import { Behavior } from '../state/behavior'


export const ACTION_ADD_UNIT: string = 'add-unit'
export interface IAddUnitAction extends Action {
  /** unit type id */
  unitId: string
  many: number
  x: number
  y: number
  /**if player is human doesn't matter who is it because we know he has to have a button pressed */
  playerId: string 
  /** means user ctrl-click for adding the unit - in that case we wont turn off the add-unit-buttons */
  ctrlKey?: boolean
}

export function addNewUnit(state: IState, action: IAddUnitAction): IState {
  state = State.get()
  if (action.type !== ACTION_ADD_UNIT) {
    return state
  }
  return addNewUnitImpl(state, action)
}


export function addNewUnitImpl(state: IState, action: IAddUnitAction): IState {

  state = State.get()
  const helper = State.getHelper()
  const playerIsHuman = !action.playerId

  const isNotAddableToBoard = action.unitId && helper.unitType(state, action.unitId).isNotAddableToBoard as any

  const playerUi = state.uiState.playerControls
    .find(pc => (!playerIsHuman ? (pc.playerId === action.playerId) : !!pc.addUnitButtons.find(but => but.pressed))) || state.uiState.playerControls
    .find(pc => pc.playerId === action.playerId)

  if (!isNotAddableToBoard && !playerUi) { // this probably means that user is selecting a unit in the board (didn't previously clicked add-unit button)
    return state
  }

  action.playerId = !isNotAddableToBoard && playerUi.playerId

  const button = isNotAddableToBoard || playerUi.addUnitButtons.find(b => b.pressed)
  if (!isNotAddableToBoard && !button && playerIsHuman) {
    Game.getInstance().log({ message: 'No unit selected!, first click one of the add-unit buttons at the top and then the board' })
    return state
  }
  action.unitId = action.unitId || button.unitTypeId

  return State.modify(state, s => {

    let box:IBox

    const unit = newUnit(state, action.unitId, action.playerId)

    if (isNotAddableToBoard) {
      Game.getInstance().emit(Events.EVENT_AFTER_ADD_UNIT, { newUnit: unit, action, player: playerUi, box, state: s })

    } else if ((box = helper.box(s, action.x, action.y)) !== undefined && 
        helper.unitBehavior(Behavior.get(), action.unitId).unitCanBeCreatedHere(action.playerId, box)
        // State.getHelper().getAvailablePlacesFor(s, playerUi.playerId).find(p => p.x === action.x && p.y === action.y)) 
        // stateHelper.getAvailablePlacesFor(state, this.id)
      ) {
     
      let cancelledReason: string
      Game.getInstance().emit(Events.EVENT_BEFORE_ADD_UNIT_SUCCESS, {
        action, player: playerUi, box, state: s, cancelCallback: (reason: string) => {
          cancelledReason = reason
        },
      })
      if (cancelledReason && playerIsHuman) {
        Game.getInstance().log({ message:cancelledReason })
        return s
      }
      box.units.push(unit)

      // reset all add-unit-buttons
      if (!action.ctrlKey && playerIsHuman) { 
        // s.uiState.playerControls.forEach(pc => pc.addUnitButtons.forEach(b => b.pressed = false))
        s.uiState.unitSelection = []
        // s.uiState.unitTypeSelection = null
      }
      Game.getInstance().emit(Events.EVENT_AFTER_ADD_UNIT, { newUnit: unit, action, player: playerUi, box, state: s })
      
    } else if (playerIsHuman) {
      Game.getInstance().log({ message: 'Cannot add unit there - box is outside territory' })
    }
  })
}
